import React, { useContext } from "react";
import { Container, Nav, Navbar, Button, Badge } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CartContext from "../store/cart-context";
import AuthContext from "../store/auth-context";
import classes from "./StoreNavBar.module.css";

function StoreNavBar({ handleCartShow }) {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const totalQty = cartCtx.items.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();
  const navigate = useNavigate();

  const logOutHandler = () => {
    authCtx.logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" expand="lg" style={{ marginBottom: "10px" }}>
      <Container>
        <Nav className="me-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${classes.navLink} ${classes.active}` : classes.navLink
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? `${classes.navLink} ${classes.active}` : classes.navLink
            }
          >
            STORE
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? `${classes.navLink} ${classes.active}` : classes.navLink
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive ? `${classes.navLink} ${classes.active}` : classes.navLink
            }
          >
            CONTACT US
          </NavLink>
          {!isLoggedIn && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${classes.navLink} ${classes.active}` : classes.navLink
              }
            >
              LOGIN
            </NavLink>
          )}
        </Nav>

        <Nav className="ms-auto">
          {location.pathname === "/products" && (
            <Button className={classes.cartButton} onClick={handleCartShow}>
              Cart
              <Badge pill className={classes.cartBadge}>
                {totalQty}
              </Badge>
            </Button>
          )}
          {isLoggedIn && (
            <Button className={classes.logoutButton} onClick={logOutHandler}>
              Logout
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default StoreNavBar;
