import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchListingsByCategory } from "../store/Listing/listingActions";
import BookingModal from "../components/Modal/BookingModal";
import PriceFilter from "../components/PriceFilter";
import styles from "./CategoryPage.module.css";
import ListingItem from "../components/ListingItem";

const CategoryPage = () => {
    const [listings, setListings] = useState([]); // State to store all listings
    const [filteredItems, setFilteredItems] = useState([]); // State for filtered items
    const [loading, setLoading] = useState(true); // Loading state
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [selectedListing, setSelectedListing] = useState(null); // Selected listing for booking

    // Get the category name from URL query parameters
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryName = queryParams.get("category");

    useEffect(() => {
        const fetchListings = async () => {
            const { response, error } = await fetchListingsByCategory(categoryName);
            if (response) {
                setListings(response); // Store all listings in state
                setFilteredItems(response); // Initially show all listings
                setLoading(false); // Loading complete
            } else {
                console.error(error);
                setLoading(false);
            }
        };

        fetchListings();
    }, [categoryName]); // Re-fetch listings if category changes

    // Function to filter items based on price range
    const filterItems = (minPrice = 0, maxPrice = Infinity) => {

        const filtered = listings.filter((listing) => {
            const price = +listing.pricePerNight;

            // Check if price is greater than or equal to minPrice
            const isInMinRange = price >= minPrice;

            // Check if maxPrice is provided and apply the filter accordingly
            const isInMaxRange = maxPrice !== Infinity ? price <= maxPrice : true;

            // Return true only if both conditions are satisfied
            return isInMinRange && isInMaxRange;
        });

        setFilteredItems(filtered); // Update filtered items
    };


    // Handle price filter apply
    const applyPriceFilter = (minPrice, maxPrice) => {
        filterItems(minPrice, maxPrice); // Trigger filtering
    };

    // Show the booking modal
    const handleShowModal = (listing) => {
        setSelectedListing(listing); // Set selected listing
        setShowModal(true); // Show modal
    };

    // Close the booking modal
    const handleCloseModal = () => {
        setShowModal(false); // Hide modal
        setSelectedListing(null); // Clear selected listing
    };

    if (loading) {
        return <div>Loading...</div>; // Display loading message
    }

    return (
        <div className={styles.categoryPage}>
            <h1>{categoryName} Listings</h1>

            {/* Price Filter Component */}
            <PriceFilter applyFilter={applyPriceFilter} />

            {/* Display filtered items */}
            {filteredItems.length > 0 ? (
                <div className={styles.listingGrid}>
                    {filteredItems.map((listing) => (
                        <ListingItem
                            key={listing.id}
                            listing={listing}
                            onBook={handleShowModal}
                        />
                    ))}
                </div>
            ) : (
                <p>No listings found for this category and price range.</p>
            )}

            {/* Booking Modal */}
            {selectedListing && (
                <BookingModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    listing={selectedListing}
                />
            )}
        </div>
    );
};

export default CategoryPage;
