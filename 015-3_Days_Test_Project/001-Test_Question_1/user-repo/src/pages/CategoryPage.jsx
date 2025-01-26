import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchAllListings } from "../store/Listing/listingActions"; // Adjust to your file structure
import { Card, Button, Form, Row, Col } from "react-bootstrap"; // Importing Row, Col, Card, and Button components
import BookingModal from "../components/Modal/BookingModal"; // Import the BookingModal component
import styles from "./CategoryPage.module.css";

const CategoryPage = () => {
    const [listings, setListings] = useState([]); // State to store all listings
    const [filteredItems, setFilteredItems] = useState([]); // State to store filtered items based on category and price
    const [loading, setLoading] = useState(true); // Loading state
    const [minPrice, setMinPrice] = useState(0); // Min price filter
    const [maxPrice, setMaxPrice] = useState(1000); // Max price filter
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [selectedListing, setSelectedListing] = useState(null); // State to store the selected listing for booking

    // Get the category name from the URL query parameters
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryName = queryParams.get('category');  // Extract 'category' from query params
    console.log(categoryName); // For debugging

    useEffect(() => {
        const fetchListings = async () => {
            const { response, error } = await fetchAllListings(); // Fetch all listings from Firebase
            if (response) {
                setListings(response); // Store listings in state
                filterItems(response); // Apply filter initially
                setLoading(false); // Set loading to false once data is fetched
            } else {
                console.error(error);  // Handle errors if needed
                setLoading(false);
            }
        };

        fetchListings();
    }, []); // Only fetch data once when the component mounts

    const filterItems = (listings) => {
        const filtered = listings.filter((listing) => {
            const isInPriceRange =
                +listing.pricePerNight >= minPrice && +listing.pricePerNight <= maxPrice;
            const isInCategory = categoryName
                ? listing.category.toLowerCase() === categoryName.toLowerCase()
                : true;

            return isInPriceRange && isInCategory;
        });
        setFilteredItems(filtered); // Store filtered listings
    };

    const handlePriceChange = () => {
        filterItems(listings); // Reapply filter when price changes
    };

    const applyPriceFilter = () => {
        filterItems(listings); // Reapply filter when the "Apply" button is clicked
    };

    const handleShowModal = (listing) => {
        setSelectedListing(listing); // Set the selected listing for booking
        setShowModal(true); // Show the modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
        setSelectedListing(null); // Clear the selected listing
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading message while fetching data
    }

    return (
        <div className={styles.categoryPage}>
            <h1>{categoryName} Listings</h1>

            {/* Price Filter Row */}
            <Row className={styles.priceFilterRow}>
                <Col md={4}>
                    <Form.Group controlId="minPrice">
                        <Form.Label>From</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="maxPrice">
                        <Form.Label>To</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                    <Button variant="primary" onClick={applyPriceFilter}>
                        Apply
                    </Button>
                </Col>
            </Row>

            {/* Display filtered items */}
            {filteredItems.length > 0 ? (
                <div className={styles.categoryItems}>
                    {filteredItems.map((listing, index) => (
                        <Card key={index} className={styles.categoryCard}>
                            <Card.Img
                                variant="top"
                                src={listing.imageUrl || "https://via.placeholder.com/300"} // Fallback image
                                className={styles.image}
                            />
                            <Card.Body>
                                <Card.Title className={styles.caption}>{listing.placeName}</Card.Title>
                                <Card.Text className={styles.price}>${listing.pricePerNight} / night</Card.Text>
                                <Card.Text className={styles.address}>
                                    {listing.address}, {listing.city}, {listing.pincode}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleShowModal(listing)}>
                                    Book Now
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            ) : (
                <p>No listings found for this category and price range.</p> // Show this message if no listings match the filters
            )}

            {/* Booking Modal */}
            {selectedListing && (
                <BookingModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    listing={selectedListing} // Pass the selected listing to the modal
                />
            )}
        </div>
    );
};

export default CategoryPage;
