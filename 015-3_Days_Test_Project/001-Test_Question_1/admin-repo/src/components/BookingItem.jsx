import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import styles from "./BookingItem.module.css";

// Helper function to convert DD/MM/YYYY to YYYY-MM-DD
const convertToDate = (dateString) => {
    const parts = dateString.split('/');
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); // Convert to YYYY-MM-DD
};

// Helper function to calculate the number of days between two dates
const calculateNumberOfDays = (checkInDate, checkOutDate) => {
    const checkIn = convertToDate(checkInDate); // Convert to valid date format
    const checkOut = convertToDate(checkOutDate); // Convert to valid date format

    // Check if the dates are valid
    if (isNaN(checkIn) || isNaN(checkOut)) {
        console.error("Invalid date format:", checkInDate, checkOutDate);
        return "Invalid date"; // Return a fallback if the date is invalid
    }

    const timeDifference = checkOut - checkIn; // Time difference in milliseconds
    const numberOfDays = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days

    return numberOfDays;
};

const BookingItem = ({ booking, onApprove, onReject }) => {
    // Calculate the number of days
    const numberOfDays = calculateNumberOfDays(booking.checkInDate, booking.checkOutDate);

    return (
        <Card className={styles.bookingCard}>
            <Card.Body>
                <Card.Title>{booking.placeName}</Card.Title>
                <Card.Text>
                    <strong>Name:</strong> {booking.user} <br />
                    <strong>Email:</strong> {booking.email} <br />
                    <strong>Check-in:</strong> {booking.checkInDate} <br />
                    <strong>Check-out:</strong> {booking.checkOutDate} <br />
                    <strong>Number of Days:</strong> {numberOfDays} <br />
                </Card.Text>

                <Badge
                    variant={booking.status === "pending" ? "warning" : "success"}
                    className={styles.statusBadge}
                >
                    {booking.status}
                </Badge>

                <div className={styles.buttonGroup}>
                    {booking.status === "pending" && (
                        <>
                            <Button
                                variant="success"
                                onClick={() => onApprove(booking.id)}
                                className={styles.approveButton}
                            >
                                Approve
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => onReject(booking.id)}
                                className={styles.rejectButton}
                            >
                                Reject
                            </Button>
                        </>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default BookingItem;
