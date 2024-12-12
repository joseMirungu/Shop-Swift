// client/src/pages/Cart.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5555/api/cart', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(error => console.error('Error:', error));
  }, [token, navigate]);

  const handleUpdateQuantity = (itemId, quantity) => {
    fetch(`http://localhost:5555/api/cart/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ quantity })
    })
      .then(res => res.json())
      .then(data => {
        setCartItems(cartItems.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        ));
      })
      .catch(error => console.error('Error:', error));
  };

  const handleRemoveItem = (itemId) => {
    fetch(`http://localhost:5555/api/cart/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
      })
      .catch(error => console.error('Error:', error));
  };

  const handleCheckout = () => {
    fetch('http://localhost:5555/api/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.ok) {
          navigate('/orders');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const total = cartItems.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md">
        {cartItems.length === 0 ? (
          <p className="p-4 text-center text-gray-600">Your cart is empty</p>
        ) : (
          <>
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
            <div className="p-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
