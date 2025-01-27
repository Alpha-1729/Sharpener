import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import styles from "./BookingItem.module.css";

// Helper function to convert DD/MM/YYYY to YYYY-MM-DD
const convertToDate = (dateString) => {
    const parts = dateString.split("/");
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
};

// Helper function to calculate the number of days between two dates
const calculateNumberOfDays = (checkInDate, checkOutDate) => {
    const checkIn = convertToDate(checkInDate);
    const checkOut = convertToDate(checkOutDate);

    if (isNaN(checkIn) || isNaN(checkOut)) {
        console.error("Invalid date format:", checkInDate, checkOutDate);
        return "Invalid date";
    }

    const timeDifference = checkOut - checkIn;
    return timeDifference / (1000 * 3600 * 24);
};

// Helper function to format dates (e.g., Aug 24 - Aug 27)
const formatDateRange = (checkInDate, checkOutDate) => {
    const checkIn = convertToDate(checkInDate);
    const checkOut = convertToDate(checkOutDate);

    const options = { month: "short", day: "numeric" };
    return `${checkIn.toLocaleDateString("en-US", options)} - ${checkOut.toLocaleDateString("en-US", options)}`;
};

const BookingItem = ({ booking, onApprove }) => {
    // Calculate the number of days
    const numberOfDays = calculateNumberOfDays(booking.checkInDate, booking.checkOutDate);
    const dateRange = formatDateRange(booking.checkInDate, booking.checkOutDate);

    return (
        <Card className={`${styles.bookingCard} shadow-sm`}>
            <div className={styles.cardContent}>
                {/* Image Section */}
                <div className={styles.imageContainer}>
                    <img
                        src={booking.imageUrl}
                        alt={booking.placeName}
                        className={styles.image}
                    />
                    <Badge
                        className={styles.statusBadge}
                        variant={booking.status === "pending" ? "warning" : "success"}
                    >
                        {booking.status}
                    </Badge>
                </div>

                {/* Details Section */}
                <div className={styles.details}>
                    <div className={styles.header}>
                        <h5 className={styles.placeName}>{booking.placeName}</h5>
                    </div>

                    <div className={styles.info}>
                        <p className={styles.userName}>{booking.user}</p>
                        <div className={styles.dateRange}>
                            <span>{dateRange}</span>
                        </div>
                        <p className={styles.nights}>{numberOfDays} {numberOfDays === 1 ? "Day" : "Days"}</p>
                    </div>

                    {booking.status === "pending" && (
                        <div className={styles.actions}>
                            <Button
                                variant="success"
                                onClick={() => onApprove(booking.id)}
                                className={styles.approveButton}
                            >
                                Approve
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default BookingItem;
