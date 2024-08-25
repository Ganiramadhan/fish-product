import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { CartItem } from './Interface';

interface HeaderProps {
  cart: CartItem[];
}

const Header: React.FC<HeaderProps> = ({ cart = [] }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-blue-600 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-4 relative">
        <Link href="/" passHref>
          <div className={`text-3xl font-extrabold cursor-pointer tracking-wide ${isScrolled ? 'text-white' : 'text-blue-600'}`}>
            <span className="text-yellow-400">Desa</span>Rasa
          </div>
        </Link>

        <nav className={`hidden lg:flex flex-1 justify-center space-x-8 ${isScrolled ? 'text-white' : 'text-blue-600'}`}>
          <Link href="/fresh-fish" className="hover:text-yellow-400 transition duration-300 font-bold">
            Fresh Fish
          </Link>
          <Link href="/seafood-packages" className="hover:text-yellow-400 transition duration-300 font-bold">
            Seafood Packages
          </Link>
          <Link href="/special-offers" className="hover:text-yellow-400 transition duration-300 font-bold">
            Special Offers
          </Link>
        </nav>

        <div className="flex items-center space-x-6 lg:ml-auto">
          <Link
            href={{
              pathname: '/cart',
              query: { cart: JSON.stringify(cart) },
            }}
            className={`relative cursor-pointer hover:text-yellow-400 transition duration-300 flex items-center ${isScrolled ? 'text-white' : 'text-blue-600'}`}
          >
            <FaShoppingCart className="mr-2 text-lg" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl lg:hidden">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden fixed top-16 left-0 w-full bg-blue-600 text-white transition-transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav className="flex flex-col items-center space-y-4 py-4">
          <Link href="/fresh-fish" className="hover:text-yellow-400 transition duration-300 font-bold">
            Fresh Fish
          </Link>
          <Link href="/seafood-packages" className="hover:text-yellow-400 transition duration-300 font-bold">
            Seafood Packages
          </Link>
          <Link href="/special-offers" className="hover:text-yellow-400 transition duration-300 font-bold">
            Special Offers
          </Link>
          <Link
            href={{
              pathname: '/cart',
              query: { cart: JSON.stringify(cart) },
            }}
            className={`relative cursor-pointer hover:text-yellow-400 transition duration-300 flex items-center ${isScrolled ? 'text-white' : 'text-blue-600'}`}
          >
            <FaShoppingCart className="text-lg" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
