import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUpForm from './components/Auth/SignUpForm';
import LoginForm from './components/Auth/LoginForm';
import NavBar from './components/NavBar';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import InboxPage from './components/InboxPage';
// import { SentPage } from './components/SentPage';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Fragment>
      <NavBar />
      <Routes>
        {isAuthenticated && (
          <Route path="/" element={<HomePage />}>
            <Route path="inbox" element={<InboxPage />} />
          </Route>
        )}

        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Fragment>
  );
}

export default App;
