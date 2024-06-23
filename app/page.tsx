'use client'

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
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const addToCart = (productId: number) => {
    const productToAdd = products.find(product => product.id === productId);

    if (productToAdd) {
      const existingProduct = cart.find(item => item.id === productId);

      if (existingProduct) {
        setCart(cart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        setCart([...cart, { ...productToAdd, quantity: 1 }]);
      }
    }
  };

  const calculateTotal = (): number => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleDetailClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handlePay = () => {
    if (cart.length > 0) {
      setShowLoading(true);
      setTimeout(() => {
        setShowAlert(true);
        setCart([]);
        setShowLoading(false);
      }, 3000);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
      setShowAlert(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white py-6 mb-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Desa Rasa</h1>
          <p className="text-lg mt-2">Discover the Freshness of Our Seafood Delivered to Your Doorstep</p>
          </div>
      </header>

      <div className="container mx-auto py-8">
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center w-full">
                <img src={product.image} alt={product.name} className="rounded-lg mb-2 w-full h-48 object-cover" />
                <div className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                  {product.category}
                </div>
                <h2 className="text-lg font-bold text-gray-800 mt-2">{product.name}</h2>
                <p className="text-sm text-gray-700 mt-2">{product.description}</p>
                <p className="text-lg font-bold text-blue-600">Rp {product.price}</p>

                <div className="flex space-x-2 mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                    onClick={() => addToCart(product.id)}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-md"
                    onClick={() => handleDetailClick(product)}
                  >
                    Detail
                  </button>
                </div>
              </div>
            ))}
        </div>

        {products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
          <p className="text-center text-gray-600 mt-4">No products found</p>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center border-b border-gray-300 py-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="text-blue-600">Rp {item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold">Total:</span>
                <span className="text-blue-600 font-bold">Rp {calculateTotal()}</span>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                  onClick={handlePay}
                >
                  Pay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="rounded-lg mb-4 w-full h-64 object-cover" />
            <div className="space-y-2">
              <p><strong>Category:</strong> {selectedProduct.category}</p>
              <p><strong>Price:</strong> Rp {selectedProduct.price}</p>
              <p><strong>Stock:</strong> {selectedProduct.stock}</p>
              <p className="mt-2">{selectedProduct.description}</p>
              <p><strong>Manfaat:</strong> {selectedProduct.benefits}</p>
              <p><strong>Nutritional Information:</strong> {selectedProduct.nutritionalInfo}</p>
              <p><strong>Origin:</strong> {selectedProduct.origin}</p>
              <p><strong>Cooking Suggestions:</strong> {selectedProduct.cookingSuggestions}</p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-xl font-bold text-gray-800">Payment Successful!</p>
            <p className="text-gray-700 mt-2">Thank you for your purchase.</p>
          </div>
        </div>
      )}

      {showLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-xl font-bold text-gray-800">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
}
