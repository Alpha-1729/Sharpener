import React, { useContext } from "react";
import { Container, Nav, Navbar, Button, Badge } from "react-bootstrap";
import CartContext from "../store/cart-context";

function StoreNavBar({ handleCartShow }) {
    const cartCtx = useContext(CartContext);
    const totalQty = cartCtx.items.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" style={{ marginBottom: '10px' }}>
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
                        <Button variant="success" onClick={handleCartShow}>
                            Cart
                            <Badge pill bg="danger" style={{ marginLeft: '5px' }}>
                                {totalQty}
                            </Badge>

                        </Button>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default StoreNavBar;
