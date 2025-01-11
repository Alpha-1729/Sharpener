import React from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import CartItemHeader from './UI/CartItemHeader';
import CartItemBody from './UI/CartItemBody';

const cartElements = [
    { title: 'Colors', price: 100, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png', quantity: 2 },
    { title: 'Black and white Colors', price: 50, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png', quantity: 3 },
    { title: 'Yellow and Black Colors', price: 70, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png', quantity: 1 }
];

function CartModal({ handleCartClose, showCartModal }) {


    return (
        <>
            <Modal show={showCartModal} onHide={handleCartClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <CartItemHeader />
                        <CartItemBody cartElements={cartElements} />
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCartClose}>
                        PURCHASE
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CartModal;
