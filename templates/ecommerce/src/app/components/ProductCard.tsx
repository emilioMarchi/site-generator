interface Props {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export const ProductCard = ({ title, description, price, image, category }: Props) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
            {category}
          </span>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">{price}</span>
          <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};
