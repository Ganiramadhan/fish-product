'use client'

import { useState } from 'react';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { FaGoogle } from 'react-icons/fa'; // Import Google icon

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (username === 'admin' && password === '123') {
      alertify.alert('Success', 'Login successful');
      
    } else {
      alertify.alert('Failled', 'Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Welcome Back</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center mt-6">
          <button
            className="flex items-center justify-center w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:green-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <FaGoogle className="mr-2" /> Login with Google
          </button>
        </div>
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account? <a href="#" className="text-indigo-600 hover:text-indigo-500 font-bold">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
