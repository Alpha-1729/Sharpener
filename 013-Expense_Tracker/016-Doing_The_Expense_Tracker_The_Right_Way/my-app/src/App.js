import { Fragment, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import HomeScreen from "./pages/HomeScreen";
import ProfileDetails from "./components/Profile/ProfileDetails";
import PasswordResetForm from "./components/Auth/PasswordResetForm";

// Pages
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { authActions } from "./store/authSlice";

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically log out user if they visit /reset-password
    if (window.location.pathname === "/reset-password" && isAuthenticated) {
      dispatch(authActions.logout());  // Use dispatch to logout
      navigate("/reset-password");
    }
  }, [isAuthenticated, dispatch, navigate]);

  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<HomeScreen />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/reset-password" element={<PasswordResetForm />} />
        {!isAuthenticated && <Route path="/auth" element={<LoginPage />} />}
        {isAuthenticated && <Route path="/profile" element={<ProfileDetails />} />}
        {!isAuthenticated && <Route path="/profile" element={<Navigate to="/auth" />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Fragment>
  );
}

export default App;
