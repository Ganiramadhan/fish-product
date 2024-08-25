'use client'

import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductDetailModal from './components/ProductDetailModal';
import { Product, CartItem } from './components/Interface';
import products from '../public/data/products';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const addToCart = (productId: number) => {
    const productToAdd = products.find(product => product.id === productId);

    if (productToAdd) {
      setCart((prevCart) => {
        const existingProduct = prevCart.find(item => item.id === productId);
        if (existingProduct) {
          return prevCart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { ...productToAdd, quantity: 1 }];
        }
      });
    }
  };

  const calculateTotal = (): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleDetailClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handlePay = async () => {
    if (cart.length > 0) {
      setShowLoading(true);

      try {
        const transactionDetails = {
          order_id: `order-${Math.random().toString(36).substr(2, 9)}`,
          gross_amount: calculateTotal(),
        };

        const customerDetails = {
          first_name: 'Nama',
          email: 'email@example.com',
        };

        const itemDetails = cart.map((item) => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          name: item.name,
        }));

        const response = await fetch('/api/transaction', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transactionDetails,
            customerDetails,
            itemDetails,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          window.location.href = result.redirect_url;
        } else {
          console.error('Payment failed:', result);
        }
      } catch (error) {
        console.error('Payment failed:', error);
      } finally {
        setShowLoading(false);
      }
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="100 min-h-screen">
      <Header cart={cart} />
      <main className="container mx-auto py-8 px-4 mt-16">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

        <ProductList
          products={filteredProducts}
          onAddToCart={addToCart}
          onViewDetail={handleDetailClick}
        />
      </main>

      <Cart cart={cart} onPay={handlePay} showLoading={showLoading} />

      {showLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}

      <ProductDetailModal product={selectedProduct} onClose={closeModal} />
    </div>
  );
}
