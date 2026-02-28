interface Category {
  name: string;
  image: string;
  count: number;
}

interface Props {
  categories: Category[];
}

export const Categories = ({ categories }: Props) => {
  return (
    <section id="categorias" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Categorías</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explora nuestras categorías y encuentra lo que buscas</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <a
              key={index}
              href="#"
              className="group relative overflow-hidden rounded-2xl aspect-square"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm">{category.count} productos</p>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors">
            Ver Todas las Categorías
          </button>
        </div>
      </div>
    </section>
  );
};
