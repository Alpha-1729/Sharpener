import React, { useContext } from "react";
import classes from './ProductItem.module.css';
import { Button, Card, Container } from "react-bootstrap";
import CartContext from "../store/cart-context";

function ProductItem({ product }) {
    const cartCtx = useContext(CartContext);

    function addItemHandler() {
        const existingItem = cartCtx.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
            cartCtx.updateItem(existingItem);
        }
        else {
            cartCtx.addItem({ ...product, quantity: 1 });
        }
    }

    return (<Card className={classes['card-container']}>
        <Card.Title className={classes['card-title']}>
            {product.title}
        </Card.Title>

        <Card.Img
            className={classes['card-img']}
            variant="top"
            src={product.imageUrl}
            alt={product.title}
        />

        <Card.Body>
            <div className={classes['card-footer']}>
                <span className={classes['card-price']}>
                    ₹{product.price}
                </span>
                <Button className={classes['add-to-cart-btn']} variant="primary" size="sm" onClick={addItemHandler}>
                    ADD TO CART
                </Button>
            </div>
        </Card.Body>
    </Card>);
}

export default ProductItem;