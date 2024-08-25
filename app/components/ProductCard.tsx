import React from 'react';
import { Product } from './Interface';
import { formatRupiah } from './Utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
  onViewDetail: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetail }) => {
  return (
    <div
      key={product.id}
      className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center w-full transform hover:scale-105 transition-all"
    >
      <img
        src={product.image}
        alt={product.name}
        className="rounded-lg mb-3 w-full h-48 object-cover shadow-lg"
      />
      <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
        {product.category}
      </div>
      <h2 className="text-lg font-bold text-gray-800 mt-2 text-center">
        {product.name}
      </h2>
      <p className="text-sm text-gray-700 mt-2 text-center">{product.description}</p>
      <p className="text-lg font-bold text-blue-600 text-center">
        {formatRupiah(product.price)} <span className="text-sm text-gray-600">/kg</span>
      </p>

      {/* Buttons */}
      <div className="flex mt-4 space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm"
          onClick={() => onAddToCart(product.id)}
        >
          Add to Cart
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md shadow-sm"
          onClick={() => onViewDetail(product)}
        >
          Detail
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
