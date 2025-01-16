import React, { useEffect } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import ProductItem from "./ProductItem";
import { useContext } from "react";
import CartContext from "../store/cart-context";
import AuthContext from '../store/auth-context';
import axios from 'axios';

function ProductList({ products }) {
    const authCtx = useContext(AuthContext);
    const cartCtx = useContext(CartContext);
    const userEmail = authCtx.email;

    useEffect(() => {
        const updateCartItems = async () => {
            const sanitizedEmail = userEmail.replace(/[@.]/g, "");
            const url = `https://crudcrud.com/api/a48bde08f0b34becb28e9229ff472b80/cart${sanitizedEmail}`;
            const currentCart = await axios.get(url);

            if (currentCart.data.length > 0) {
                const id = currentCart.data[0]._id;
                await axios.put(`${url}/${id}`, {
                    data: cartCtx.items
                })
            } else {
                await axios.post(url, {
                    data: cartCtx.items
                })
            }
        };

        // Send cart items when they change
        if (cartCtx.items && cartCtx.items.length > 0) {
            updateCartItems();
        }
    }, [cartCtx.items, userEmail]);

    return (
        <Container>
            <Row>
                {products.map((product, index) => (
                    <Col key={index}>
                        <ProductItem product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ProductList;
