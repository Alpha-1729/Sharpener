import React from "react";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  { path: "/products", element: <ProductPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/", element: <HomePage /> },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
