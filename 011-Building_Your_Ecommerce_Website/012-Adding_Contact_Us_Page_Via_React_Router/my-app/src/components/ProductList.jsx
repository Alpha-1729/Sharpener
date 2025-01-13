import React from "react";
import {Container, Col, Row} from 'react-bootstrap';
import ProductItem from "./ProductItem";

function ProductList({products}) {
    return (
        <>
            <Container>
                <Row>
                    {products.map((product, index) => (
                        <Col key={index}>
                            <ProductItem product={product}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default ProductList;