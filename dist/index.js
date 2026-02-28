/**
 * Site Generator - CLI para generar sitios web a partir de configuraciones
 *
 * Uso:
 *   npm run generate -- --config=config/examples/escuela-musica.json
 *   npm run generate -- --config=config/examples/escuela-musica.json --business-data=data/sabor-y-raiz.txt
 *   npm run generate -- --slug=mi-nuevo-sitio --template=landing-basic
 */
import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { processBusinessDocument, getDemoBusinessData } from './services/aiService.js';
import { saveSiteData, saveToFirestore } from './services/firestoreService.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Util: deep-merge two objects (source overrides target)
function mergeDeep(target, source) {
    if (!source || typeof source !== 'object')
        return target;
    const out = { ...target };
    for (const key of Object.keys(source)) {
        const v = source[key];
        if (v && typeof v === 'object' && !Array.isArray(v)) {
            out[key] = mergeDeep(out[key] ?? {}, v);
        }
        else {
            out[key] = v;
        }
    }
    return out;
}
// Rutas base
const ROOT_DIR = path.resolve(__dirname, '../');
const TEMPLATES_DIR = path.join(ROOT_DIR, 'templates');
const OUTPUT_DIR = path.join(ROOT_DIR, 'output');
const CONFIG_DIR = path.join(ROOT_DIR, 'config');
// Rutas alternativas (proyectos de referencia)
const REFERENCE_PROJECTS_DIR = path.resolve(ROOT_DIR, '../../DESARROLLO-WEB');
// Funciones del generador
function loadConfig(configPath) {
    const fullPath = path.resolve(configPath);
    if (!fs.existsSync(fullPath)) {
        throw new Error(`Archivo de configuración no encontrado: ${fullPath}`);
    }
    const config = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    return config;
}
function loadQueue() {
    const queuePath = path.join(CONFIG_DIR, 'queue.json');
    if (!fs.existsSync(queuePath)) {
        return { pendientes: [], procesados: [], enProceso: null };
    }
    return JSON.parse(fs.readFileSync(queuePath, 'utf-8'));
}
function saveQueue(queue) {
    const queuePath = path.join(CONFIG_DIR, 'queue.json');
    fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
}
function addToQueue(configPath) {
    const queue = loadQueue();
    if (!queue.pendientes.includes(configPath) && !queue.procesados.includes(configPath)) {
        queue.pendientes.push(configPath);
        saveQueue(queue);
        console.log(chalk.green(`✓ Agregado a la cola: ${configPath}`));
    }
    else {
        console.log(chalk.yellow(`⚠ Ya está en la cola: ${configPath}`));
    }
    // (Template-specific base data for business will be merged after templatePath is resolved)
}
function getTemplateVariables(config) {
    return {
        '{{SITIO_NOMBRE}}': config.sitio.nombre,
        '{{SITIO_SLUG}}': config.sitio.slug,
        '{{SITIO_DESCRIPCION}}': config.sitio.descripcion,
        '{{COLOR_PRIMARY}}': config.theme.colores.primary,
        '{{COLOR_SECONDARY}}': config.theme.colores.secondary,
        '{{COLOR_ACCENT}}': config.theme.colores.accent || '#000000',
        '{{COLOR_SUCCESS}}': config.theme.colores.success || '#22c55e',
        '{{COLOR_ERROR}}': config.theme.colores.error || '#ef4444',
        '{{FUENTE}}': config.theme.fuente,
        '{{BORDER_RADIUS}}': config.theme.borderRadius,
        '{{SITIO_EMAIL}}': config.contacto.email,
        '{{SITIO_TELEFONO}}': config.contacto.telefono,
        '{{SITIO_WHATSAPP}}': config.contacto.whatsapp || config.contacto.telefono,
        '{{SITIO_DIRECCION}}': config.contacto.direccion || '',
        '{{SITIO_HORARIOS}}': config.contacto.horarios || '',
        '{{SITIO_INSTAGRAM}}': config.redes?.instagram || '',
        '{{SITIO_FACEBOOK}}': config.redes?.facebook || '',
        '{{SITIO_YOUTUBE}}': config.redes?.youtube || '',
        '{{FIREBASE_COLECCION}}': config.servicios.firebase.coleccion,
        '{{DOMINIO}}': config.dominio.principal,
        '{{SEO_TITULO}}': config.seo.tituloBase,
        '{{SEO_DESCRIPCION}}': config.seo.metaDescription,
    };
}
function replaceVariables(content, variables) {
    let result = content;
    for (const [key, value] of Object.entries(variables)) {
        result = result.split(key).join(value);
    }
    return result;
}
function processFile(filePath, variables) {
    if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx') &&
        !filePath.endsWith('.json') && !filePath.endsWith('.js') &&
        !filePath.endsWith('.md') && !filePath.endsWith('.txt')) {
        return;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const processed = replaceVariables(content, variables);
    fs.writeFileSync(filePath, processed);
}
function processDirectory(dirPath, variables) {
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            // Procesar subdirectorios recursivamente
            // Excluir node_modules, .git, .next y otras carpetas de build
            const excludeDirs = ['node_modules', '.git', '.next', 'dist', 'build', '.cache'];
            if (!excludeDirs.includes(item)) {
                processDirectory(fullPath, variables);
            }
        }
        else if (stat.isFile()) {
            processFile(fullPath, variables);
        }
    }
}
/**
 * Generar archivo .env.local automáticamente desde el config
 */
function generateEnvFile(config) {
    const slug = config.sitio.slug;
    const dominio = config.dominio.principal;
    const firebase = config.servicios.firebase;
    return `# Generated automatically - Site: ${config.sitio.nombre}
# Don't commit this file to version control!

# --- PUBLIC VARIABLES ---
NEXT_PUBLIC_URL="https://${dominio}"
NEXT_PUBLIC_SITE_URL="https://${dominio}"
NEXT_PUBLIC_SITE_SLUG="${slug}"
NEXT_PUBLIC_MAP_KEY="AIzaSyBx22d-0k89a6XudTZTl7yPLHslLPrr_zk"

# Firebase Client (public)
NEXT_PUBLIC_FIREBASE_API_KEY="${firebase.apiKey || 'AIzaSyDcr8xNlUsfZIhAQ1-IyXr0n9uqE1Slyuc'}"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="${firebase.authDomain || 'site-generator-db.firebaseapp.com'}"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="${firebase.projectId || 'site-generator-db'}"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="${firebase.storageBucket || 'site-generator-db.firebasestorage.app'}"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="${firebase.messagingSenderId || '184414289992'}"
NEXT_PUBLIC_FIREBASE_APP_ID="${firebase.appId || '1:184414289992:web:57c1f2ddc8cc3fb00c987d'}"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="${firebase.measurementId || 'G-7QRXEGB54J'}"

# Firebase Admin (server-side - for admin panel)
FIREBASE_PROJECT_ID="${firebase.projectId || 'site-generator-db'}"
FIREBASE_CLIENT_EMAIL="${firebase.clientEmail || ''}"
FIREBASE_PRIVATE_KEY="${firebase.privateKey || ''}"

# --- SERVER VARIABLES ---
RESEND_API_KEY="${config.servicios.resend?.apiKey || 're_2yRGpzPD_KHK2sgrWVFBPPjsBgSVFKjk3'}"
`;
}
function copyTemplateDir(src, dest) {
    // Crear directorio destino
    fs.ensureDirSync(dest);
    const items = fs.readdirSync(src);
    for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        const stat = fs.statSync(srcPath);
        if (stat.isDirectory()) {
            // Ignorar carpetas que no queremos copiar
            const ignoreDirs = ['node_modules', '.git', '.next', 'dist', 'build', '.cache'];
            if (!ignoreDirs.includes(item)) {
                copyTemplateDir(srcPath, destPath);
            }
        }
        else if (stat.isFile()) {
            // Copiar archivo
            fs.copyFileSync(srcPath, destPath);
        }
    }
}
async function generateSite(configPath, businessDataPath, doBuild, doDeploy, overrideTipo) {
    console.log(chalk.bold.cyan('\n🚀 Generando sitio web...\n'));
    // Cargar configuración
    let config = loadConfig(configPath);
    const { slug, template, nombre, tipo } = config.sitio;
    // Display the effective type (respecting any override from CLI)
    const displayTipo = overrideTipo ?? (tipo ?? 'landing');
    console.log(chalk.gray('  Tipo:'), displayTipo);
    // Template name will be resolved below; log after resolution
    console.log(chalk.gray('  Nombre:'), nombre);
    console.log(chalk.gray('  Slug:'), slug);
    // Procesar documento de negocio con IA (si se proporciona)
    let businessData = null;
    if (businessDataPath) {
        try {
            console.log(chalk.gray('  Procesando datos del negocio...'));
            businessData = await processBusinessDocument(businessDataPath);
            if (businessData) {
                console.log(chalk.green('  ✓ Datos del negocio procesados con IA'));
                console.log(chalk.gray('    Nombre:'), businessData.name);
                console.log(chalk.gray('    Servicios:'), businessData.services?.length || 0);
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.log(chalk.yellow('  ⚠ Error procesando documento, usando datos de muestra'));
            console.log(chalk.gray('    Error:'), errorMessage);
            businessData = getDemoBusinessData(nombre);
        }
    }
    else {
        // Usar datos de muestra si no hay documento
        console.log(chalk.gray('  Usando datos de muestra...'));
        businessData = getDemoBusinessData(nombre);
    }
    console.log('');
    // Determinar la ruta de la plantilla
    let templatePath = path.join(TEMPLATES_DIR, template);
    // If an override type is provided, prefer its template path when available
    if (typeof (overrideTipo) !== 'undefined' && overrideTipo) {
        const t = overrideTipo;
        const candidate = t === 'portfolio' ? path.join(TEMPLATES_DIR, 'portfolio') : path.join(TEMPLATES_DIR, t);
        if (fs.existsSync(candidate)) {
            templatePath = candidate;
        }
        else {
            const fallbackTemplate = path.join(TEMPLATES_DIR, 'landing');
            if (fs.existsSync(fallbackTemplate))
                templatePath = fallbackTemplate;
        }
    }
    // Si no existe el template específico, usar el tipo como fallback
    if (!fs.existsSync(templatePath)) {
        const effectiveTipo = overrideTipo ?? (tipo ?? 'landing');
        if (effectiveTipo === 'portfolio') {
            const portfolioPath = path.join(TEMPLATES_DIR, 'portfolio');
            if (fs.existsSync(portfolioPath)) {
                templatePath = portfolioPath;
            }
            else {
                // Fall back al landing si no existe plantilla portfolio
                const fallbackLanding = path.join(TEMPLATES_DIR, 'landing');
                if (fs.existsSync(fallbackLanding))
                    templatePath = fallbackLanding;
            }
        }
        else {
            const fallbackPath = path.join(TEMPLATES_DIR, effectiveTipo);
            if (fs.existsSync(fallbackPath))
                templatePath = fallbackPath;
        }
    }
    // Si aún no existe, buscar en proyectos de referencia
    if (!fs.existsSync(templatePath)) {
        const refPath = path.join(REFERENCE_PROJECTS_DIR, template);
        if (fs.existsSync(refPath)) {
            console.log(chalk.gray('  Usando proyecto de referencia...'));
            templatePath = refPath;
        }
        else {
            throw new Error(`Plantilla no encontrada: ${template}. Busca en: ${templatePath}`);
        }
    }
    // Mezclar configuración base de la plantilla (si existe)
    const baseConfigPath = path.join(templatePath, 'config.base.json');
    if (fs.existsSync(baseConfigPath)) {
        try {
            const base = JSON.parse(fs.readFileSync(baseConfigPath, 'utf-8'));
            config = mergeDeep(base, config);
        }
        catch {
            // ignore parse errors, keep original config
        }
    }
    // Mezclar datos de negocio base de la plantilla (si existe)
    const baseBusinessPath = path.join(templatePath, 'business.base.json');
    if (fs.existsSync(baseBusinessPath) && businessData) {
        try {
            const baseBiz = JSON.parse(fs.readFileSync(baseBusinessPath, 'utf-8'));
            businessData = mergeDeep(baseBiz, businessData);
        }
        catch {
            // ignore parse errors
        }
    }
    // Crear directorio de salida (manejo de conflicto en Windows)
    let outputPath = path.join(OUTPUT_DIR, slug);
    if (fs.existsSync(outputPath)) {
        console.log(chalk.yellow(`⚠ El directorio ${slug} ya existe. Se sobrescribirá.`));
        try {
            fs.removeSync(outputPath);
        }
        catch (err) {
            console.warn('WARNING: No se pudo eliminar la carpeta existente. Creando una ruta alternativa para evitar fallos.');
            const altPath = path.join(OUTPUT_DIR, slug + '_' + Date.now());
            fs.ensureDirSync(altPath);
            outputPath = altPath;
        }
    }
    console.log(chalk.gray('  Plantilla efectiva:'), path.basename(templatePath));
    console.log(chalk.gray('  Copiando plantilla...'));
    // Copiar plantilla (manualmente, ignorando node_modules)
    copyTemplateDir(templatePath, outputPath);
    // Obtener variables de sustitución
    const variables = getTemplateVariables(config);
    console.log(chalk.gray('  Procesando variables...'));
    // Procesar archivos
    processDirectory(outputPath, variables);
    // Generar archivo .env.local automáticamente
    const envContent = generateEnvFile(config);
    const envPath = path.join(outputPath, '.env.local');
    fs.writeFileSync(envPath, envContent);
    console.log(chalk.gray('  Generando .env.local...'));
    // Copiar service account de Firebase Admin
    const serviceAccountPath = path.join(ROOT_DIR, 'site-generator-db-firebase-adminsdk-fbsvc-bff160769d.json');
    if (fs.existsSync(serviceAccountPath)) {
        const destServiceAccountPath = path.join(outputPath, 'firebase-service-account.json');
        fs.copyFileSync(serviceAccountPath, destServiceAccountPath);
        console.log(chalk.gray('  Copiando service account...'));
    }
    // Guardar config en el proyecto generado
    const generatedConfigPath = path.join(outputPath, 'site-config.json');
    fs.writeFileSync(generatedConfigPath, JSON.stringify(config, null, 2));
    // Guardar business data en el proyecto generado
    const savedBusinessDataPath = path.join(outputPath, 'business-data.json');
    fs.writeFileSync(savedBusinessDataPath, JSON.stringify(businessData, null, 2));
    console.log(chalk.gray('  Guardando datos del negocio...'));
    // Guardar datos unificados para Firestore (estructura nueva)
    await saveSiteData(outputPath, config, businessData, slug);
    // Guardar en Firestore (si está configurado)
    const projectId = config.servicios?.firebase?.projectId || slug;
    const siteDoc = await import('./services/firestoreService.js').then(m => m.mergeDataForFirestore(config, businessData, slug));
    await saveToFirestore(projectId, slug, siteDoc);
    // Actualizar cola
    const queue = loadQueue();
    queue.enProceso = configPath;
    saveQueue(queue);
    // Marcar como procesado
    queue.pendientes = queue.pendientes.filter(p => p !== configPath);
    queue.procesados.push(configPath);
    queue.enProceso = null;
    saveQueue(queue);
    console.log(chalk.green.bold('\n✓ Sitio generado exitosamente!'));
    console.log(chalk.gray('  Ubicación:'), outputPath);
    // Ejecutar build si se solicita
    if (doBuild) {
        // Usar npm.cmd en Windows
        const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
        const isWin = process.platform === 'win32';
        console.log(chalk.gray('\n  Ejecutando npm install...'));
        try {
            const installCmd = isWin ? `cmd /c "${npmCmd} install"` : `${npmCmd} install`;
            execSync(installCmd, { cwd: outputPath, stdio: 'inherit' });
            console.log(chalk.green('  ✓ Dependencias instaladas'));
        }
        catch (error) {
            console.log(chalk.yellow('  ⚠ npm install tuvo errores'));
            return;
        }
        console.log(chalk.gray('\n  Ejecutando build...'));
        try {
            const buildCmd = isWin ? `cmd /c "${npmCmd} run build"` : `${npmCmd} run build`;
            execSync(buildCmd, { cwd: outputPath, stdio: 'inherit' });
            console.log(chalk.green('  ✓ Build completado'));
        }
        catch (error) {
            console.log(chalk.yellow('  ⚠ Build tuvo errores (revisá el output arriba)'));
        }
    }
    // Deploy a Vercel si se solicita
    if (doDeploy && doBuild) {
        console.log(chalk.gray('\n  Deploying to Vercel...'));
        try {
            const deployCmd = 'cmd /c "vercel deploy --prod --yes"';
            execSync(deployCmd, { cwd: outputPath, stdio: 'inherit' });
            console.log(chalk.green('  ✓ Deploy completado!'));
        }
        catch (error) {
            console.log(chalk.yellow('  ⚠ Deploy tuvo errores'));
        }
    }
    console.log(chalk.gray('\n  Próximos pasos:'));
    if (doDeploy) {
        console.log(chalk.cyan('  ✓ Deployment completado!'));
    }
    else if (doBuild) {
        console.log(chalk.cyan('  Listo para deploy en Vercel!'));
    }
    else {
        console.log(chalk.cyan('  1. cd ' + outputPath));
        console.log(chalk.cyan('  2. npm install'));
        console.log(chalk.cyan('  3. npm run dev'));
    }
    console.log('');
}
async function processQueue() {
    const queue = loadQueue();
    if (queue.pendientes.length === 0) {
        console.log(chalk.yellow('No hay sitios pendientes en la cola.'));
        return;
    }
    console.log(chalk.cyan(`\n📋 Procesando cola (${queue.pendientes.length} sitios)\n`));
    for (const configPath of queue.pendientes) {
        try {
            await generateSite(configPath);
        }
        catch (error) {
            console.error(chalk.red(`\n✗ Error al generar ${configPath}:`), error);
        }
    }
}
function showQueue() {
    const queue = loadQueue();
    console.log(chalk.bold('\n📋 Estado de la cola de generación\n'));
    console.log(chalk.yellow('Pendientes:'));
    if (queue.pendientes.length === 0) {
        console.log(chalk.gray('  (ninguno)'));
    }
    else {
        queue.pendientes.forEach(p => console.log(chalk.gray('  •'), p));
    }
    console.log(chalk.green('\nProcesados:'));
    if (queue.procesados.length === 0) {
        console.log(chalk.gray('  (ninguno)'));
    }
    else {
        queue.procesados.forEach(p => console.log(chalk.gray('  •'), p));
    }
    console.log('');
}
// CLI
const program = new Command();
program
    .name('site-generator')
    .description('Generador de sitios web a partir de configuraciones')
    .version('1.0.0');
program
    .command('generate')
    .description('Generar un sitio a partir de un archivo de configuración')
    .requiredOption('-c, --config <path>', 'Ruta al archivo de configuración')
    .option('-t, --type <type>', 'Tipo de sitio a generar: landing | ecommerce | portfolio')
    .option('-b, --business-data <path>', 'Ruta al archivo con información del negocio (TXT, DOCX, PDF)')
    .option('-d, --demo', 'Usar datos de demostración (sin documento)')
    .option('--build', 'Ejecutar npm run build después de generar')
    .option('--deploy', 'Hacer deploy a Vercel después de generar (requiere --build)')
    .action(async (options) => {
    try {
        const businessDataPath = options.demo ? null : options.businessData;
        await generateSite(options.config, businessDataPath, options.build, options.deploy, options.type);
    }
    catch (error) {
        console.error(chalk.red('Error:'), error);
        process.exit(1);
    }
});
program
    .command('queue:add')
    .description('Agregar un config a la cola de procesamiento')
    .argument('<config>', 'Ruta al archivo de configuración')
    .action((config) => {
    addToQueue(config);
});
program
    .command('queue:process')
    .description('Procesar todos los sitios en cola')
    .action(async () => {
    try {
        await processQueue();
    }
    catch (error) {
        console.error(chalk.red('Error:'), error);
        process.exit(1);
    }
});
program
    .command('queue:status')
    .description('Mostrar estado de la cola')
    .action(() => {
    showQueue();
});
program.parse();
//# sourceMappingURL=index.js.map