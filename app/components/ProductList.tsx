import React from 'react';
import { Product } from './Interface';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onAddToCart: (id: number) => void;
  onViewDetail: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, onViewDetail }) => {
  if (products.length === 0) {
    return <p className="text-center text-gray-600 mt-4">No products found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
};

export default ProductList;
