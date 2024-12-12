// client/src/pages/Products.js
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategorySidebar from '../components/CategorySidebar';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5555/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const url = selectedCategory
      ? `http://localhost:5555/api/products?category_id=${selectedCategory}`
      : 'http://localhost:5555/api/products';

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error:', error));
  }, [selectedCategory]);

  return (
    <div className="flex gap-6">
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;