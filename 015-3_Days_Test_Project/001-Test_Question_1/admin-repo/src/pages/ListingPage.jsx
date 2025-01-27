import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import { listingActions } from "../store/Listing/listingSlice";
import { categoryActions } from "../store/Category/categorySlice";
import ListingModal from "../components/Modal/ListingModal";
import ListingItem from "../components/ListingItem";
import { deleteListing, fetchAllListings } from "../store/Listing/listingActions";
import { fetchAllCategories } from "../store/Category/categoryActions";
import styles from "./ListingPage.module.css";

function ListingPage() {
    const dispatch = useDispatch();
    const listings = useSelector((state) => state.listing.listings);
    const categories = useSelector((state) => state.categories.categories);

    const [modalState, setModalState] = useState({
        showModal: false,
        isEditing: false,
        currentListing: {},
    });

    // Fetch all listings when the component mounts
    useEffect(() => {
        const getListings = async () => {
            const { response, error } = await fetchAllListings();
            if (response) {
                dispatch(listingActions.setListings(response));
            } else {
                console.error(error);
            }
        };

        getListings();
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            const { response, error } = await fetchAllCategories();
            if (!error) {
                dispatch(categoryActions.setCategories(response));
            } else {
                console.error("Failed to fetch categories", error);
            }
        })();
    }, [dispatch]);

    const handleShowModal = () => {
        setModalState({
            showModal: true,
            isEditing: false,
            currentListing: {},
        });
    };

    const handleEditListing = (listing) => {
        setModalState({
            showModal: true,
            isEditing: true,
            currentListing: listing,
        });
    };

    const handleDeleteListing = async (listingId) => {
        const { response, error } = await deleteListing(listingId);
        if (response) {
            dispatch(listingActions.deleteListing(listingId));
        } else {
            console.error(error);
        }
    };

    const handleCloseModal = () => {
        setModalState({ showModal: false, isEditing: false, currentListing: {} });
    };

    return (
        <div className={styles.listingPage}>
            <h1 className={styles.pageHeading}>Listings</h1>

            {/* Add Listing Button - Placed above the grid */}
            <Button className={styles.addButton} onClick={handleShowModal}>
                Add Listing
            </Button>

            {/* Listings Grid (two items side by side with a gap in the middle) */}
            <div className={styles.listingGrid}>
                {listings.map((listing) => (
                    <ListingItem
                        key={listing.id}
                        listing={listing}
                        categories={categories}
                        onEdit={handleEditListing}
                        onDelete={handleDeleteListing}
                    />
                ))}
            </div>

            {/* Modal for Add/Edit */}
            <ListingModal
                showModal={modalState.showModal}
                handleClose={handleCloseModal}
                isEditing={modalState.isEditing}
                currentListing={modalState.currentListing}
            />
        </div>
    );
}

export default ListingPage;
