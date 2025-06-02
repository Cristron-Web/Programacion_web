import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import PublishProduct from './pages/publishProduct';

const App = () => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    const productToAdd = {
      id: Date.now(),
      ...newProduct,
      price: `${newProduct.price} CLP`
    };
    setProducts(prevProducts => [productToAdd, ...prevProducts]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/publish" element={<PublishProduct onProductSubmit={handleAddProduct} />} />
      </Routes>
    </Router>
  );
};

export default App; 