import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUpForm from './components/Auth/SignUpForm';
import LoginForm from './components/Auth/LoginForm';
import NavBar from './components/NavBar';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import InboxPage from './components/InboxPage';
import OutboxPage from './components/OutboxPage';
import InboxEmailViewer from './components/UI/InboxEmailViewer';
import OutboxEmailViewer from './components/UI/OutboxEmailViewer';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Fragment>
      <NavBar />
      <Routes>
        {isAuthenticated && (
          <Route path="/" element={<HomePage />}>
            <Route path="inbox/:emailKey" element={<InboxEmailViewer />} />
            <Route path="outbox/:emailKey" element={<OutboxEmailViewer />} />
            <Route path="inbox" element={<InboxPage />} />
            <Route path="outbox" element={<OutboxPage />} />
          </Route>
        )}

        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Fragment>
  );
}

export default App;
