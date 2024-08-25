'use client';

import { useState, useRef, useEffect } from 'react';
import products from '../public/data/products';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  benefits: string;
  nutritionalInfo: string;
  origin: string;
  cookingSuggestions: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

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

  const formatRupiah = (value: number): string => {
    return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
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

        const response = await fetch('api/transaction', {
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

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white py-6 mb-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Desa Rasa</h1>
          <p className="text-lg mt-2">
            Discover the Freshness of Our Seafood Delivered to Your Doorstep
          </p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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
                <h2 className="text-lg font-bold text-gray-800 mt-2">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-700 mt-2">{product.description}</p>
                <p className="text-lg font-bold text-blue-600">
                  {formatRupiah(product.price)}
                </p>

                <div className="flex space-x-3 mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm"
                    onClick={() => addToCart(product.id)}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md shadow-sm"
                    onClick={() => handleDetailClick(product)}
                  >
                    Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">No products found</p>
        )}
      </main>

      <section className="mt-8 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul>
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-300 py-2"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="text-blue-600">
                    {formatRupiah(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold">Total:</span>
              <span className="text-blue-600 font-bold">
                {formatRupiah(calculateTotal())}
              </span>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md shadow-sm"
                onClick={handlePay}
              >
                {showLoading ? 'Processing...' : 'Pay'}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
