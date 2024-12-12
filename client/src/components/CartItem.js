import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <img 
          src={item.product.image_url} 
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold">{item.product.name}</h3>
          <p className="text-gray-600">${item.product.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
          className="w-16 px-2 py-1 border rounded"
        />
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-600 hover:text-red-700"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
