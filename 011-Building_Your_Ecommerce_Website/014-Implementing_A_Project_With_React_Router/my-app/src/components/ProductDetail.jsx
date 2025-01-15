import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Card, Carousel } from "react-bootstrap";
import CartContext from "../store/cart-context";
import StoreNavBar from "./StoreNavBar";

function ProductDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product; // Access passed product state
    const cartCtx = useContext(CartContext);

    // Mock reviews (replace with actual data or API call)
    const reviews = [
        { id: 1, author: "John Doe", text: "Great product! Highly recommend." },
        { id: 2, author: "Jane Smith", text: "Good quality, worth the price." },
        { id: 3, author: "Sam Wilson", text: "Satisfactory, but could improve packaging." },
    ];

    // Handle missing product data
    if (!product) {
        return (
            <Container className="text-center mt-5">
                <h2>Product not found!</h2>
                <Button variant="secondary" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </Container>
        );
    }

    const addItemHandler = () => {
        const existingItem = cartCtx.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
            cartCtx.updateItem(existingItem);
        } else {
            cartCtx.addItem({ ...product, quantity: 1 });
        }
    };

    return (
        <>
            <StoreNavBar />
            <Container>
                {/* Product Card */}
                <Card className="mt-4 shadow">
                    <Card.Title className="text-center mt-3">{product.title}</Card.Title>
                    <Card.Body>
                        {/* Product Images Carousel */}
                        <Carousel>
                            {product.images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        style={{
                                            width: "100%",
                                            maxHeight: "400px",
                                            objectFit: "contain",
                                        }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <div className="text-center mt-4">
                            <h2>₹{product.price}</h2>
                            {product.description && (
                                <p className="mt-3">{product.description}</p>
                            )}
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={addItemHandler}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </Card.Body>
                </Card>

                {/* Reviews Section */}
                <div className="mt-5">
                    <h3>Customer Reviews</h3>
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <Card key={review.id} className="mt-3">
                                <Card.Body>
                                    <h5>{review.author}</h5>
                                    <p>{review.text}</p>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p>No reviews yet. Be the first to review this product!</p>
                    )}
                </div>
            </Container>
        </>

    );
}

export default ProductDetail;
