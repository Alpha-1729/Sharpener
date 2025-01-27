import React from "react";
import { Carousel, Card, Button } from "react-bootstrap";
import styles from "./ListingItem.module.css";

// Function to format the date without the year
const formatDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
};

function ListingItem({ listing, onBook }) {
    return (
        <Card className={styles.card}>
            {/* Image Section */}
            <div className={styles.imageContainer}>
                <Carousel indicators={false} className={styles.carousel}>
                    {listing.imageUrls.map((url, index) => (
                        <Carousel.Item key={index}>
                            <img
                                src={url}
                                alt={`Slide ${index + 1}`}
                                className={styles.image}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            {/* Details Section */}
            <Card.Body className={styles.body}>
                <Card.Title className={styles.title}>
                    {listing.placeName}
                </Card.Title>
                <Card.Text className={styles.city}>
                    {listing.city}
                </Card.Text>
                <Card.Text className={styles.description}>
                    {listing.description}
                </Card.Text>
            </Card.Body>

            {/* Footer Section */}
            <Card.Footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <span className={styles.price}>
                        ₹{listing.pricePerNight.toLocaleString()} / night
                    </span>
                    {listing.isAvailable && (
                        <span className={styles.dateRange}>
                            {formatDate(listing.fromDate)} - {formatDate(listing.toDate)}
                        </span>
                    )}
                </div>
                <Button
                    className={styles.bookButton}
                    onClick={() => onBook(listing)}
                >
                    Book Now
                </Button>
            </Card.Footer>
        </Card>
    );
}

export default ListingItem;
