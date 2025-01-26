import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import styles from "./OrderHistoryItem.module.css";

const OrderHistoryItem = ({ order, onDelete }) => {
    console.log(order);

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

                <Badge variant={order.status === "pending" ? "warning" : "success"} className={styles.statusBadge}>
                    {order.status}
                </Badge>

                <Card.Text className={styles.cardText}>
                    <strong>Price:</strong> <span className={styles.price}>${order.bookedPrice}</span> <br />
                    <strong>Description:</strong> {order.lisitngDescription} <br />
                    <strong>Order Date:</strong> <span className={styles.orderDate}>{order.bookingDate}</span> {/* Displaying the order date */}
                </Card.Text>

                {/* Delete Button only for pending bookings */}
                {order.status === "pending" && (
                    <Button variant="danger" onClick={handleDelete} className={styles.deleteButton}>
                        Delete Booking
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default OrderHistoryItem;
