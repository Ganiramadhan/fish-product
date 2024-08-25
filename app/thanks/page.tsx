'use client'

import React from 'react';

const Thanks = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-green-600">Thank You!</h1>
        <p className="mt-4 text-gray-700 text-lg">Your purchase was successful. Thanks for buying with us!</p>
        <button
          onClick={handleGoHome}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Thanks;
