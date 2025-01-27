import React from "react";
import { Carousel, Card, Button } from "react-bootstrap";
import styles from "./ListingItem.module.css";

// Function to format the date without the year
const formatDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
};

function ListingItem({ listing, onEdit, onDelete }) {
    return (
        <Card className={styles.card}>
            <div className={styles.cardContent}>
                {/* Image Viewer */}
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
                <div className={styles.details}>
                    <h4 className={styles.title}>{listing.placeName}</h4>
                    <p className={styles.city}>{listing.city}</p>
                    <p className={styles.description}>{listing.description}</p>
                    <Button
                        className={`${styles.statusButton} btn`}
                        disabled
                    >
                        {listing.isAvailable ? "Available" : "Not Available"}
                    </Button>
                </div>
            </div>

            {/* Footer Section */}
            <div className={styles.footer}>
                <div className={styles.priceAndActions}>
                    <span className={styles.price}>
                        ₹{listing.pricePerNight.toLocaleString()}
                    </span>

                    {/* Date Range Badge */}
                    {listing.isAvailable && (
                        <span className={styles.dateRange}>
                            <span className={styles.boldText}>
                                {new Date(listing.fromDate).toLocaleString('default', { month: 'short', day: 'numeric' })} -
                                {new Date(listing.toDate).toLocaleString('default', { month: 'short', day: 'numeric' })}
                            </span>
                        </span>
                    )}

                    <div className={styles.actions}>
                        <Button
                            className={`${styles.editButton} btn`}
                            onClick={() => onEdit(listing)}
                        >
                            Edit
                        </Button>
                        <Button
                            className={`${styles.deleteButton} btn`}
                            onClick={() => onDelete(listing.id)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>

        </Card>
    );
}

export default ListingItem;
