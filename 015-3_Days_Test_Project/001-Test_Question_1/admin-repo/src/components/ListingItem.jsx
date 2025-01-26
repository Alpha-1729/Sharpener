import React from "react";
import { useSelector } from "react-redux";
import { Button, ListGroup, Row, Col } from "react-bootstrap";
import styles from "./ListingItem.module.css";

function ListingItem({ listing, onEdit, onDelete }) {
    const categories = useSelector((state) => state.categories.categories);
    const categoryName = categories.find((category) => category.name === listing.category)?.name || "N/A";

    return (
        <ListGroup.Item className={styles.listingItem}>
            <Row className={styles.listingRow}>
                {/* Display listing details */}
                <Col xs={12} md={6} className={styles.listingText}>
                    <h4 className={styles.listingTitle}>{listing.placeName}</h4>
                    <p className={styles.listingDetail}>
                        <strong>Address:</strong> {listing.address}
                    </p>
                    <p className={styles.listingDetail}>
                        <strong>City:</strong> {listing.city}
                    </p>
                    <p className={styles.listingDetail}>
                        <strong>Pincode:</strong> {listing.pincode}
                    </p>
                    <p className={styles.listingDetail}>
                        <strong>Category:</strong> {categoryName}
                    </p>
                    <p className={styles.listingDetail}>
                        <strong>Status:</strong> {listing.isAvailable ? "Available" : "Not Available"}
                    </p>
                    <p className={styles.listingDetail}>
                        <strong>From Date:</strong> {listing.fromDate}
                    </p>
                    <p className={styles.listingDetail}>
                        <strong>To Date:</strong> {listing.toDate}
                    </p>
                    <p className={styles.listingDetail}>
                        <strong>Description:</strong> {listing.description}
                    </p>
                </Col>

                {/* Display images */}
                <Col xs={12} md={3} className={styles.imageContainer}>

                    <img key={listing.id} src={listing.imageUrl} alt={`Listing ${listing.id}`} className={styles.listingImage} />
                </Col>

                {/* Amount and action buttons */}
                <Col xs={12} md={3} className={styles.listingActions}>
                    <p className={styles.listingAmount}>${listing.pricePerNight}</p>
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
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

export default ListingItem;