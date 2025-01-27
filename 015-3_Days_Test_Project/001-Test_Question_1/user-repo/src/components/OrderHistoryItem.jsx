import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import styles from "./OrderHistoryItem.module.css";

// Function to format the price with commas and rupee symbol
const formatPrice = (price) => {
    return `₹${price.toLocaleString()}`;
};

const OrderHistoryItem = ({ order, onDelete }) => {
    const handleDelete = () => {
        // Call the onDelete function passed from the parent component
        onDelete(order.id);
    };

    return (
        <Card className={styles.orderCard}>
            <Card.Img
                variant="top"
                src={order.imageUrl}
                alt={order.placeName}
                className={styles.image}
            />
            <Card.Body>
                <Card.Title as="h4" className={styles.placeName}>
                    {order.placeName}
                </Card.Title>

                {/* Status Badge */}
                <Badge
                    variant={order.status === "pending" ? "warning" : "success"}
                    className={styles.statusBadge}
                >
                    {order.status}
                </Badge>

                {/* Description Section */}
                <Card.Text className={styles.description}>
                    {order.lisitngDescription}
                </Card.Text>
            </Card.Body>

            {/* Price and Delete Section */}
            <Card.Footer className={styles.footer}>
                <div className={styles.priceDeleteContainer}>
                    <span className={styles.price}>{formatPrice(order.bookedPrice)}</span>
                    {/* Delete Button only for pending bookings */}
                    {order.status === "pending" && (
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            className={styles.deleteButton}
                        >
                            Delete Booking
                        </Button>
                    )}
                </div>
            </Card.Footer>
        </Card>
    );
};

export default OrderHistoryItem;
