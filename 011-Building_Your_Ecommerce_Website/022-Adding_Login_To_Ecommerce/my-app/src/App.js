// App.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import ContactUsPage from "./pages/ContactUsPage";
import ProductDetail from "./components/ProductDetail";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<ProductPage />} exact />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
    </Routes >
  );
}

export default App;
