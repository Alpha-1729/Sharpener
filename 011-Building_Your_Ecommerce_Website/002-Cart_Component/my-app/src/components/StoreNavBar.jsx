import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
// import classes from './StoreNavBar.module.css'; // Import styles from CSS module

function StoreNavBar({ handleCartShow }) {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg">
            <Container>
                <Nav className={`me-auto`}>
                    <Nav.Link href="#home">
                        <h2>HOME</h2>
                    </Nav.Link>
                    <Nav.Link href="#store">
                        <h2>STORE</h2>
                    </Nav.Link>
                    <Nav.Link href="#about">
                        <h2>ABOUT</h2>
                    </Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    <Nav.Link href="#cart">
                        <Button variant="success" onClick={handleCartShow}>Cart</Button>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default StoreNavBar;
