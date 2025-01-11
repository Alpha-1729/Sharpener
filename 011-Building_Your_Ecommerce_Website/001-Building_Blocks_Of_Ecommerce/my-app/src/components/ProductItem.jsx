import React from "react";
import classes from './ProductItem.module.css';
import {Button, Card, Container} from "react-bootstrap";

function ProductItem({product}) {
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
                <Button className={classes['add-to-cart-btn']} variant="primary" size="sm">
                    ADD TO CART
                </Button>
            </div>
        </Card.Body>
    </Card>);
}

export default ProductItem;