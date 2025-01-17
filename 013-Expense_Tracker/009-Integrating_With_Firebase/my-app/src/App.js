import { Fragment, useContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import AuthContext from "./store/auth-context";
import HomeScreen from "./pages/HomeScreen";
import ProfileDetails from "./components/Profile/ProfileDetails";
import PasswordResetForm from "./components/Auth/PasswordResetForm";

const About = () => <h1>About Page</h1>;
const Contact = () => <h1>Contact Page</h1>;

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically log out user if they visit /reset-password
    if (window.location.pathname === "/reset-password" && isLoggedIn) {
      authCtx.logout();
      navigate("/reset-password");
    }
  }, [isLoggedIn, authCtx, navigate]);

  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<HomeScreen />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reset-password" element={<PasswordResetForm />} />
        {!isLoggedIn && <Route path="/auth" element={<LoginPage />} />}
        {isLoggedIn && <Route path="/profile" element={<ProfileDetails />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Fragment>
  );
}

export default App;
