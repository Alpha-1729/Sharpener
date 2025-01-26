import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookingItem from "../components/BookingItem";
import styles from "./BookingPage.module.css";
import { fetchBookingHistory } from "../store/BookingHistory/bookingHistoryActions"; // assuming this function fetches booking data
import { approveBooking, rejectBooking } from "../store/Booking/bookingActions"; // import approval/rejection functions

const BookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Handle approval of a booking
    const handleApprove = async (id) => {
        const { success, error } = await approveBooking(id);
        if (success) {
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === id ? { ...booking, status: "completed" } : booking
                )
            );
        } else {
            console.error(error);
        }
    };

    // Handle rejection of a booking
    const handleReject = async (id) => {
        const { success, error } = await rejectBooking(id);
        if (success) {
            setBookings((prevBookings) =>
                prevBookings.filter((booking) => booking.id !== id)
            );
        } else {
            console.error(error);
        }
    };

    // Fetch bookings on component mount
    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            const { response, error } = await fetchBookingHistory();
            if (error) {
                setError(error);
            } else {
                setBookings(response);
            }
            setLoading(false);
        };

        fetchBookings();
    }, []);  // Empty dependency array ensures the effect runs once when the component mounts

    return (
        <Container className={styles.bookingPageContainer}>
            <h2 className={styles.header}>Booking Management</h2>
            {loading ? (
                <p>Loading bookings...</p>
            ) : error ? (
                <p className={styles.error}>{error}</p>
            ) : bookings.length === 0 ? (
                <p>No bookings available.</p>
            ) : (
                <Row>
                    {bookings.map((booking) => (
                        <Col key={booking.id} md={6} lg={4}>
                            <BookingItem
                                booking={booking}
                                onApprove={handleApprove}
                                onReject={handleReject}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default BookingPage;
