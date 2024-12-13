import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5555/api/orders', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch orders');
        }
        return res.json();
      })
      .then(data => {
        console.log('API Response:', data);
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error('Error:', error);
        setOrders([]);
      });
  }, [token, navigate]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Order #{order.id}</span>
              <span className="font-medium">
                {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Unknown Date'}
              </span>
            </div>
            <div className="border-t pt-4">
              {order.order_items?.map(item => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">{item.product?.name || 'Unknown Product'}</span>
                    <span className="text-gray-600 ml-2">x{item.quantity || 0}</span>
                  </div>
                  <span>${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between items-center">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">${order.total_amount?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <p className="text-center text-gray-600">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
