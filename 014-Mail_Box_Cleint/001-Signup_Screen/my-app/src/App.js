import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUpForm from './components/Auth/SignUpForm';
import LoginForm from './components/Auth/LoginForm';


function App() {
  return (
    <Routes>
      <Route path="/" exact element={<SignUpForm />} />
      <Route path="/sign-up" element={<SignUpForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/home" element={<SignUpForm />} />
      <Route path="/contact-us" element={<SignUpForm />} />
    </Routes>
  );
}

export default App;
