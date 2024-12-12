import React from 'react';

const CategorySidebar = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul>
        <li className="mb-2">
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full text-left px-2 py-1 rounded ${
              !selectedCategory ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'
            }`}
          >
            All Products
          </button>
        </li>
        {categories.map(category => (
          <li key={category.id} className="mb-2">
            <button
              onClick={() => onSelectCategory(category.id)}
              className={`w-full text-left px-2 py-1 rounded ${
                selectedCategory === category.id 
                  ? 'bg-red-100 text-red-600' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
