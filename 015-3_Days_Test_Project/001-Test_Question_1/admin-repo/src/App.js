import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUpForm from './components/Auth/SignUpForm';
import LoginForm from './components/Auth/LoginForm';
import NavBar from './components/NavBar';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Footer from './components/Footer/Footer';
import CategoryPage from './pages/CategoryPage';
import ListingPage from './pages/ListingPage';
import BookingPage from './pages/BookingPage';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Fragment>
      <NavBar />
      {/* Main content wrapper */}
      <div className="main-content">
        <Routes>
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/listing" element={<ListingPage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </div>
      {/* Footer */}
      <Footer />
    </Fragment>
  );
}

export default App;
