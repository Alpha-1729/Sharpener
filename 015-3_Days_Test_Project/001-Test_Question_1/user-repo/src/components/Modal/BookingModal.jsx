import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import BookingModal from "./BookingModal"; // Adjust the path as needed
import styles from "./ListingDetailsPage.module.css"; // Adjust the styles

const ListingDetailsPage = ({ listing }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div className={styles.listingDetailsPage}>
            <Card className={styles.listingCard}>
                <Card.Img
                    variant="top"
                    src={listing.imageUrl || "https://via.placeholder.com/300"} // Fallback image
                />
                <Card.Body>
                    <Card.Title>{listing.placeName}</Card.Title>
                    <Card.Text>${listing.pricePerNight} / night</Card.Text>
                    <Card.Text>{listing.address}, {listing.city}</Card.Text>
                    <Button variant="primary" onClick={handleShow}>
                        Book Now
                    </Button>
                </Card.Body>
            </Card>

            {/* Booking Modal */}
            <BookingModal show={showModal} handleClose={handleClose} />
        </div>
    );
};

export default ListingDetailsPage;
