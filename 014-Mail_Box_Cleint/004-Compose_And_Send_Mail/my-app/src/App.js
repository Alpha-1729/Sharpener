import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUpForm from './components/Auth/SignUpForm';
import LoginForm from './components/Auth/LoginForm';
import NavBar from './components/NavBar';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';


function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Fragment>

  );
}

export default App;
