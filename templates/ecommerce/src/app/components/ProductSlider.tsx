'use client';

import { useState } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

interface Props {
  products: Product[];
}

export const ProductSlider = ({ products }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const getVisibleProducts = (): Product[] => {
    const visible: Product[] = [];
    for (let i = 0; i < 4; i++) {
      visible.push(products[(currentIndex + i) % products.length]);
    }
    return visible;
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {getVisibleProducts().map((product, index) => (
          <div key={`${product.id}-${index}`} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
{product.image ? (
  <img
    src={product.image}
    alt={product.title}
    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
  />
) : (
  <div className="w-full h-full bg-gray-200 flex items-center justify-center">Imagen no disponible</div>
)}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                  Nuevo
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
              <p className="text-sm text-primary font-medium mb-1">{product.category}</p>
              <h3 className="font-semibold text-gray-900 mb-2">{product.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">{product.price}</span>
                <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};
