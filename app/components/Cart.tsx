import React from 'react';
import { CartItem } from './Interface';
import { formatRupiah } from './Utils';

interface CartProps {
  cart: CartItem[];
  onPay: () => void;
  showLoading: boolean;
}

const Cart: React.FC<CartProps> = ({ cart, onPay, showLoading }) => {
  const calculateTotal = (): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <section className="mt-8 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="mt-8 container mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>
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
            className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-md shadow-sm"
            onClick={onPay}
            disabled={showLoading}
          >
            {showLoading ? 'Processing...' : 'Pay'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
