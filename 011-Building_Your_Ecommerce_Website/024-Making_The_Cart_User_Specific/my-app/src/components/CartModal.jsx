import React, { useContext } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import CartItemHeader from './UI/CartItemHeader';
import CartItemBody from './UI/CartItemBody';
import CartContext from '../store/cart-context';

function CartModal({ handleCartClose, showCartModal }) {

    const cartCtx = useContext(CartContext);

    return (
        <>
            <Modal show={showCartModal} onHide={handleCartClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <CartItemHeader />
                        <CartItemBody cartElements={cartCtx.items} />
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
