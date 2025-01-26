import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUpForm from './components/Auth/SignUpForm';
import LoginForm from './components/Auth/LoginForm';
import NavBar from './components/NavBar';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OrderHistory from './components/OrderHistory';


function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" exact element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
