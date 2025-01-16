import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import ContactUsPage from "./pages/ContactUsPage";
import ProductDetail from "./components/ProductDetail";
import LoginPage from "./pages/LoginPage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Routes>
      {/* Redirect root to /home */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Public Routes */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/products"
        element={
          isLoggedIn ? <ProductPage /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/products/:productId"
        element={
          isLoggedIn ? <ProductDetail /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}

export default App;
