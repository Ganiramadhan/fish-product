import React, { useEffect } from 'react';
import { Product } from './Interface';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleEscKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (product) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscKey);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-11/12 max-w-lg relative"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="rounded-lg mb-4 w-full h-64 object-cover shadow-lg"
        />
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-lg font-bold mb-4">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
          <span className="text-sm text-gray-600">/kg</span>
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Benefits</h3>
          <p className="text-gray-700">{product.benefits}</p>
          <h3 className="text-xl font-semibold mt-4">Nutritional Info</h3>
          <p className="text-gray-700">{product.nutritionalInfo}</p>
          <h3 className="text-xl font-semibold mt-4">Origin</h3>
          <p className="text-gray-700">{product.origin}</p>
          <h3 className="text-xl font-semibold mt-4">Cooking Suggestions</h3>
          <p className="text-gray-700">{product.cookingSuggestions}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
