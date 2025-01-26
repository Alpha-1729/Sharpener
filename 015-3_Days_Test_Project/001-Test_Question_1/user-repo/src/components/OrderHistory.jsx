// OrderHistory.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import OrderHistoryItem from "./OrderHistoryItem";
import styles from "./OrderHistory.module.css";
import { useSelector } from "react-redux";
import { fetchOrderHistory } from "../store/OrderHistory/orderHistoryActions";
import { deleteBooking } from "../store/Booking/bookingActions";

const OrderHistory = () => {
    const [loading, setLoading] = useState(true);
    const [orderHistory, setOrderHistory] = useState([]);
    const [error, setError] = useState(null);
    const email = useSelector(state => state.auth.email);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            const { response, error } = await fetchOrderHistory(email);
            setOrderHistory(response);
            if (error) {
                setError(error);
            }
            setLoading(false);
        };

        if (email) {
            fetchOrders();
        }
    }, [email]);

    const handleDelete = async (orderId) => {
        try {
            // Call the delete API or Firebase function to remove the order from the database
            await deleteBooking(orderId);

            // Update local state after deletion
            setOrderHistory((prevOrders) => prevOrders.filter(order => order.id !== orderId));
        } catch (err) {
            setError("Failed to delete the booking.");
        }
    };

    return (
        <Container className={styles.orderHistoryContainer}>
            <h2 className={styles.header}>Your Booking History</h2>
            {loading ? (
                <p className={styles.loading}>Loading your bookings...</p>
            ) : error ? (
                <p className={styles.error}>{error}</p>
            ) : orderHistory.length === 0 ? (
                <p className={styles.noOrders}>You have no bookings yet.</p>
            ) : (
                <Row className="gy-4">
                    {orderHistory.map((order) => (
                        <Col key={order.id} md={6} lg={4}>
                            <OrderHistoryItem order={order} onDelete={handleDelete} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default OrderHistory;
