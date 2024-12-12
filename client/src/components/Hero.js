import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-red-600 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to E-Shop
        </h1>
        <p className="text-xl mb-8">
          Discover amazing products at great prices
        </p>
        <Link 
          to="/products"
          className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;