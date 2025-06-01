import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import PublishProduct from '../pages/publishProduct';
import ProductDetail from '../pages/productDetail';
import MyProducts from '../pages/myProducts';
import Profile from '../pages/profile';

<Route path="/profile" element={<Profile />} />


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/publish" element={<PublishProduct />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/my-products" element={<MyProducts />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
