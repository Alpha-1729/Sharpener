import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import CartContext from "../store/cart-context";
import classes from './ProductItem.module.css';
import AuthContext from "../store/auth-context";
import { useEffect } from "react";

function ProductItem({ product }) {
    const cartCtx = useContext(CartContext);
    const navigate = useNavigate(); // Initialize useNavigate for navigation
    

    function addItemHandler() {
        const existingItem = cartCtx.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
            cartCtx.updateItem(existingItem);
        } else {
            cartCtx.addItem({ ...product, quantity: 1 });
        }
    }

    // Function to navigate to product detail page with product state
    function handleViewButtonClick() {
        navigate(`/products/${product.id}`, { state: { product } }); // Pass product as state
    }

    return (
        <Card className={classes['card-container']}>
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
                    <Button
                        className={classes['view-btn']}
                        variant="warning"
                        size="sm"
                        onClick={handleViewButtonClick}
                        style={{ marginLeft: "10px" }} // Add some space between buttons
                    >
                        VIEW
                    </Button>
                    <Button
                        className={classes['add-to-cart-btn']}
                        variant="primary"
                        size="sm"
                        onClick={addItemHandler}
                    >
                        ADD TO CART
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductItem;
