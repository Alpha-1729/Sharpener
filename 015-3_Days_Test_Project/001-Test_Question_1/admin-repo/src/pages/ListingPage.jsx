import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import { listingActions } from "../store/Listing/listingSlice";
import ListingModal from "../components/Modal/ListingModal";
import styles from "./ListingPage.module.css";

function ListingPage() {
    const listings = useSelector((state) => state.listing.listings);
    const dispatch = useDispatch();

    const [modalState, setModalState] = useState({
        showModal: false,
        isEditing: false,
        currentListing: {},
        editIndex: null,
    });

    const handleShowModal = () => {
        setModalState({
            showModal: true,
            isEditing: false,
            currentListing: {},
            editIndex: null,
        });
    };

    const handleEditListing = (listing, index) => {
        setModalState({
            showModal: true,
            isEditing: true,
            currentListing: listing,
            editIndex: index,
        });
    };

    const handleDeleteListing = (index) => {
        dispatch(listingActions.deleteListing(index));
    };

    const handleCloseModal = () => {
        setModalState({ showModal: false, isEditing: false, currentListing: {}, editIndex: null });
    };

    return (
        <div className={styles.listingPage}>
            <h1 className={styles.pageHeading}>Listings</h1>

            {/* Add Listing Button */}
            <Button className={styles.addButton} onClick={handleShowModal}>
                Add Listing
            </Button>

            {/* Listings List */}
            <ListGroup className={styles.listingList}>
                {listings.map((listing, index) => (
                    <ListGroup.Item key={index} className={styles.listingItem}>
                        <div className={styles.listingText}>
                            <h5>{listing.placeName}</h5>
                            <p>{listing.address}</p>
                            <p>{listing.pricePerNight} per night</p>
                            <p>{listing.isAvailable ? "Available" : "Not Available"}</p>
                        </div>
                        <div className={styles.listingActions}>
                            <Button
                                className={styles.editButton}
                                onClick={() => handleEditListing(listing, index)}
                            >
                                Edit
                            </Button>
                            <Button
                                className={styles.deleteButton}
                                onClick={() => handleDeleteListing(index)}
                            >
                                Delete
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* Modal for Add/Edit */}
            <ListingModal
                showModal={modalState.showModal}
                handleClose={handleCloseModal}
                isEditing={modalState.isEditing}
                currentListing={modalState.currentListing}
                editIndex={modalState.editIndex}
            />
        </div>
    );
}

export default ListingPage;
