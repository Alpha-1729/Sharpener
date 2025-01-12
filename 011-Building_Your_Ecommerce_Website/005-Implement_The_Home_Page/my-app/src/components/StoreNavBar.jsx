import React, { useContext } from "react";
import { Container, Nav, Navbar, Button, Badge } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom"; // Import NavLink
import CartContext from "../store/cart-context";

function StoreNavBar({ handleCartShow }) {
    const cartCtx = useContext(CartContext);
    const totalQty = cartCtx.items.reduce((sum, item) => sum + item.quantity, 0);
    const location = useLocation();

    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" style={{ marginBottom: '10px' }}>
            <Container>
                <Nav className={`me-auto`}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                        style={{ textDecoration: "none", marginRight: "10px" }}
                    >
                        <h2>HOME</h2>
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                        style={{ textDecoration: "none", marginRight: "10px" }}
                    >
                        <h2>STORE</h2>
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                        style={{ textDecoration: "none", marginRight: "10px" }}
                    >
                        <h2>ABOUT</h2>
                    </NavLink>
                </Nav>
                {location.pathname === "/products" && <Nav className="ms-auto">
                    <Button variant="success" onClick={handleCartShow}>
                        Cart
                        <Badge pill bg="danger" style={{ marginLeft: '5px' }}>
                            {totalQty}
                        </Badge>
                    </Button>
                </Nav>}
            </Container>
        </Navbar>
    );
}

export default StoreNavBar;
