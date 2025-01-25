import React, { useState, useEffect } from "react";
import { Button, Modal, Form, FloatingLabel, FormCheck } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listingActions } from "../../store/Listing/listingSlice";
import styles from "./ListingModal.module.css";

function ListingModal({ showModal, handleClose, isEditing, currentListing, editIndex }) {
    const [listing, setListing] = useState(currentListing || {});
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();

    // Fetch categories from the Redux store
    const categories = useSelector((state) => state.category.categories);

    useEffect(() => {
        setListing(currentListing || {});
        setImages(currentListing?.images || []);
        setError("");
    }, [showModal, currentListing]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const handleSaveListing = () => {
        if (!listing.placeName || !listing.pricePerNight || !listing.address || !listing.city || !listing.pincode || images.length === 0 || !listing.description) {
            setError("All fields are required, including images and description!");
            return;
        }

        setError("");

        // Add the images to the listing object before saving
        const updatedListing = { ...listing, images };

        if (isEditing) {
            dispatch(listingActions.editListing({ index: editIndex, updatedListing }));
        } else {
            dispatch(listingActions.addListing(updatedListing));
        }

        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered className={styles.modalDialog}>
            <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title>{isEditing ? "Edit Listing" : "Add Listing"}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <Form>
                    {/* Category */}
                    <Form.Group className={styles.formGroup}>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            value={listing.category || ""}
                            onChange={(e) => setListing({ ...listing, category: e.target.value })}
                        >
                            {categories && categories.length > 0 ? (
                                categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))
                            ) : (
                                <option>No categories available</option>
                            )}
                        </Form.Control>
                    </Form.Group>

                    {/* Place Name */}
                    <Form.Group className={styles.formGroup}>
                        <FloatingLabel label="Place Name" controlId="placeName">
                            <Form.Control
                                type="text"
                                value={listing.placeName || ""}
                                onChange={(e) => setListing({ ...listing, placeName: e.target.value })}
                                placeholder="Enter place name"
                                isInvalid={!!error}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    {/* Price per Night */}
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Price per Night" controlId="pricePerNight">
                            <Form.Control
                                type="number"
                                value={listing.pricePerNight || ""}
                                onChange={(e) => setListing({ ...listing, pricePerNight: e.target.value })}
                                placeholder="Enter price"
                                isInvalid={!!error}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    {/* Address */}
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Address" controlId="address">
                            <Form.Control
                                type="text"
                                value={listing.address || ""}
                                onChange={(e) => setListing({ ...listing, address: e.target.value })}
                                placeholder="Enter address"
                                isInvalid={!!error}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    {/* City and Pincode on the same row */}
                    <div className="d-flex justify-content-between">
                        <Form.Group className="w-48 pr-2">
                            <FloatingLabel label="City" controlId="city">
                                <Form.Control
                                    type="text"
                                    value={listing.city || ""}
                                    onChange={(e) => setListing({ ...listing, city: e.target.value })}
                                    placeholder="Enter city"
                                    isInvalid={!!error}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="w-48 pl-2">
                            <FloatingLabel label="Pincode" controlId="pincode">
                                <Form.Control
                                    type="text"
                                    value={listing.pincode || ""}
                                    onChange={(e) => setListing({ ...listing, pincode: e.target.value })}
                                    placeholder="Enter pincode"
                                    isInvalid={!!error}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </div>

                    {/* Description */}
                    <Form.Group className={styles.formGroup}>
                        <FloatingLabel label="Description" controlId="description">
                            <Form.Control
                                as="textarea"
                                rows={12} // Increase the number of rows for the larger text area
                                value={listing.description || ""}
                                onChange={(e) => setListing({ ...listing, description: e.target.value })}
                                placeholder="Enter a description"
                                isInvalid={!!error}
                                className={styles.textarea} // Add a custom class for styling
                            />
                        </FloatingLabel>
                    </Form.Group>

                    {/* Availability Toggle Switch */}
                    <Form.Group className={styles.formGroup}>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Label>Availability</Form.Label>
                            <FormCheck
                                type="switch"
                                id="availabilitySwitch"
                                label={listing.isAvailable ? "Available" : "Not Available"}
                                checked={listing.isAvailable || false}
                                onChange={() => setListing({ ...listing, isAvailable: !listing.isAvailable })}
                            />
                        </div>
                    </Form.Group>

                    {/* Images */}
                    <Form.Group>
                        <Form.Label>Images</Form.Label>
                        <Form.Control
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            isInvalid={!!error}
                        />
                        <small className="form-text text-muted">
                            Please upload 3 to 4 images of the place.
                        </small>
                        <div className="mt-3">
                            {images && images.length > 0 && (
                                <div className="d-flex flex-wrap">
                                    {images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(image)}
                                            alt={`uploaded ${index}`}
                                            className="img-thumbnail mr-2"
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </Form.Group>

                    {/* Error Message */}
                    {error && <div className="text-danger">{error}</div>}
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={handleSaveListing}>
                    {isEditing ? "Update" : "Save"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ListingModal;
