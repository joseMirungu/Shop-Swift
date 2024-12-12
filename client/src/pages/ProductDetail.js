// client/src/pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5555/api/products/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Product not found');
        }
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5555/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        product_id: product.id,
        quantity
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to add to cart');
        }
        return res.json();
      })
      .then(() => {
        navigate('/cart');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to add item to cart');
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Product not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="p-6">
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            <div className="mb-6">
              <span className="text-2xl font-bold text-red-600">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-gray-600">
                {product.description}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border rounded-md hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 px-3 py-1 border rounded-md text-center"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border rounded-md hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
              {product.stock > 0 && (
                <span className="ml-2 text-sm text-gray-500">
                  {product.stock} units available
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-3 px-6 rounded-md text-white font-medium
                ${product.stock > 0 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Additional Product Information */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Product Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Category: {product.category?.name || 'Uncategorized'}</li>
                <li>SKU: {product.id}</li>
                {/* more product details  */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;