import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Navbar = ({ products = [] }) => {
  const { isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!products || products.length === 0) {
      console.error('Products data is not available');
      return;
    }
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
    console.log('Search results:', results);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-red-600">
              Shop Swift
            </Link>
          </div>
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Search..."
            />
            <button type="submit" className="ml-2">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-600 hover:text-gray-900" />
            </button>
          </form>
          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-gray-600 hover:text-gray-900">
              Products
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/orders" className="text-gray-600 hover:text-gray-900">
                  Orders
                </Link>
                <Link to="/account" className="text-gray-600 hover:text-gray-900">
                  <UserIcon className="h-6 w-6" />
                </Link>
                <button onClick={logout} className="text-gray-600 hover:text-gray-900">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {filteredProducts.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Search Results:</h2>
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id} className="border-b border-gray-300 py-2">
                {product.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
