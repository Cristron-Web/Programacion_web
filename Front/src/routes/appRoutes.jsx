import React, { useState, createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import PublishProduct from '../pages/publishProduct';
import ProductDetail from '../pages/productDetail';
import MyProducts from '../pages/myProducts';
import Profile from '../pages/profile';
import Messages from '../pages/Messages';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';

// Crear el contexto para los productos
export const ProductContext = createContext();

// Hook personalizado para usar el contexto de productos
export const useProducts = () => useContext(ProductContext);

const AppRoutes = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  const handleAddProduct = (newProduct) => {
    const productToAdd = {
      id: Date.now(),
      ...newProduct,
      seller: {
        id: user.id,
        name: user.name
      }
    };
    setProducts(prevProducts => [productToAdd, ...prevProducts]);
  };

  const getProductById = (id) => {
    return products.find(product => product.id === Number(id)) || null;
  };

  const getUserProducts = (userId) => {
    return products.filter(product => product.seller.id === userId);
  };

  return (
    <ProductContext.Provider value={{ products, getProductById, getUserProducts }}>
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/publish" element={
          <ProtectedRoute>
            <PublishProduct onProductSubmit={handleAddProduct} />
          </ProtectedRoute>
        } />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/my-products" element={
          <ProtectedRoute>
            <MyProducts />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        } />
      </Routes>
    </ProductContext.Provider>
  );
};

export default AppRoutes;
