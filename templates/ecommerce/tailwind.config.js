/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '{{COLOR_PRIMARY}}',
        secondary: '{{COLOR_SECONDARY}}',
        accent: '{{COLOR_ACCENT}}',
      },
      fontFamily: {
        sans: ['{{FUENTE}}', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '{{BORDER_RADIUS}}',
      },
    },
  },
  plugins: [],
}
