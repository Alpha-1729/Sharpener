import React, { useContext } from "react";
import { Container, Nav, Navbar, Button, Badge } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import CartContext from "../store/cart-context";
import classes from "./StoreNavBar.module.css";

function StoreNavBar({ handleCartShow }) {
  const cartCtx = useContext(CartContext);
  const totalQty = cartCtx.items.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();

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
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? `${classes.navLink} ${classes.active}` : classes.navLink
            }
          >
            LOGIN
          </NavLink>
        </Nav>

        {location.pathname === "/products" && (
          <Nav className="ms-auto">
            <Button
              className={classes.cartButton}
              onClick={handleCartShow}
            >
              Cart
              <Badge pill className={classes.cartBadge}>
                {totalQty}
              </Badge>
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

export default StoreNavBar;
