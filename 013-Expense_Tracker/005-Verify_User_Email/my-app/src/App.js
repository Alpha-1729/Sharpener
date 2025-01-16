import { Fragment, useContext } from "react";
import NavBar from "./components/NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AuthContext from "./store/auth-context";
import HomeScreen from "./pages/HomeScreen";
import ProfileDetails from "./components/Profile/ProfileDetails";

const About = () => <h1>About Page</h1>;
const Contact = () => <h1>Contact Page</h1>;

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<HomeScreen />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {isLoggedIn ? (
          <Route path="/profile" element={<ProfileDetails />} />  // Redirect to Home if already logged in
        ) : (
          <Route path="/auth" element={<LoginPage />} />
        )}

        {isLoggedIn ? (
          <Route path="/auth" element={<Navigate to="/" />} />  // Redirect to Home if already logged in
        ) : (
          <Route path="/auth" element={<LoginPage />} />
        )}
      </Routes>
    </Fragment>
  );
}

export default App;
