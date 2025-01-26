import React, { useRef, useEffect, useState } from "react";
import { Button, Modal, Form, FloatingLabel, FormCheck } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addListing, editListing } from "../../store/Listing/listingActions";
import styles from "./ListingModal.module.css";
import { listingActions } from "../../store/Listing/listingSlice";

function ListingModal({ showModal, handleClose, isEditing, currentListing }) {
    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();

    const categoryRef = useRef("");
    const placeNameRef = useRef("");
    const pricePerNightRef = useRef("");
    const addressRef = useRef("");
    const cityRef = useRef("");
    const pincodeRef = useRef("");
    const fromDateRef = useRef("");
    const toDateRef = useRef("");
    const descriptionRef = useRef("");
    const availabilityRef = useRef("");
    const imageUrlRef = useRef("");

    const [error, setError] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        if (isEditing) {
            categoryRef.current.value = currentListing.category || "";
            placeNameRef.current.value = currentListing.placeName || "";
            pricePerNightRef.current.value = currentListing.pricePerNight || "";
            addressRef.current.value = currentListing.address || "";
            cityRef.current.value = currentListing.city || "";
            pincodeRef.current.value = currentListing.pincode || "";
            fromDateRef.current.value = currentListing.fromDate || "";
            toDateRef.current.value = currentListing.toDate || "";
            descriptionRef.current.value = currentListing.description || "";
            availabilityRef.current.checked = currentListing.isAvailable || false;
            if (currentListing.imageUrl) {
                setImagePreview(currentListing.imageUrl);
            }
        }
        setError("");
    }, [showModal, currentListing]);

    const handleSaveListing = async () => {
        if (
            !placeNameRef.current.value ||
            !pricePerNightRef.current.value ||
            !addressRef.current.value ||
            !cityRef.current.value ||
            !pincodeRef.current.value ||
            !descriptionRef.current.value ||
            !imageUrlRef.current.files[0]
        ) {
            setError("All fields are required!");
            return;
        }

        const formData = {
            category: categoryRef.current.value,
            placeName: placeNameRef.current.value,
            pricePerNight: pricePerNightRef.current.value,
            address: addressRef.current.value,
            city: cityRef.current.value,
            pincode: pincodeRef.current.value,
            fromDate: fromDateRef.current.value,
            toDate: toDateRef.current.value,
            description: descriptionRef.current.value,
            isAvailable: availabilityRef.current.checked,
            imageUrl: imageUrlRef.current.files[0].name,
        };

        if (isEditing) {
            const { response, error } = await editListing({ id: currentListing.id, ...formData });
            dispatch(listingActions.editListing({ id: currentListing.id, updatedData: formData }));
        }
        else {
            const { response, error } = await addListing(formData);
            dispatch(listingActions.addListing(response));
        }

        setError("");
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
                        <Form.Control as="select" ref={categoryRef}>
                            {categories && categories.length > 0 ? (
                                categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))
                            ) : (
                                <option>No categories available</option>
                            )}
                        </Form.Control>
                    </Form.Group>

                    {/* Place Name and Price per Night in a row */}
                    <div className="d-flex justify-content-between">
                        <Form.Group className="w-48 pr-2">
                            <FloatingLabel label="Place Name" controlId="placeName">
                                <Form.Control
                                    type="text"
                                    ref={placeNameRef}
                                    placeholder="Enter place name"
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="w-48 pl-2">
                            <FloatingLabel label="Price per Night" controlId="pricePerNight">
                                <Form.Control
                                    type="number"
                                    ref={pricePerNightRef}
                                    placeholder="Enter price"
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </div>

                    {/* Address, City, and Pincode in a row */}
                    <div className="d-flex justify-content-between">
                        <Form.Group className="w-48 pr-2">
                            <FloatingLabel label="Address" controlId="address">
                                <Form.Control
                                    type="text"
                                    ref={addressRef}
                                    placeholder="Enter address"
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="w-48 pl-2">
                            <FloatingLabel label="City" controlId="city">
                                <Form.Control
                                    type="text"
                                    ref={cityRef}
                                    placeholder="Enter city"
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </div>

                    <div className="d-flex justify-content-between">
                        <Form.Group className="w-48 pr-2">
                            <FloatingLabel label="Pincode" controlId="pincode">
                                <Form.Control
                                    type="text"
                                    ref={pincodeRef}
                                    placeholder="Enter pincode"
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </div>

                    {/* From Date and To Date in a row */}
                    <div className="d-flex justify-content-between">
                        <Form.Group className="w-48 pr-2">
                            <FloatingLabel label="From Date" controlId="fromDate">
                                <Form.Control
                                    type="date"
                                    ref={fromDateRef}
                                    placeholder="Enter from date"
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="w-48 pl-2">
                            <FloatingLabel label="To Date" controlId="toDate">
                                <Form.Control
                                    type="date"
                                    ref={toDateRef}
                                    placeholder="Enter to date"
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </div>

                    {/* Description */}
                    <Form.Group className={styles.formGroup}>
                        <FloatingLabel label="Description" controlId="description">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                ref={descriptionRef}
                                placeholder="Enter a description"
                                className={styles.textarea}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    {/* Availability */}
                    <Form.Group className={styles.formGroup}>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Label>Availability</Form.Label>
                            <FormCheck
                                type="switch"
                                id="availabilitySwitch"
                                ref={availabilityRef}
                            />
                        </div>
                    </Form.Group>

                    {/* Single Image Selection */}
                    <Form.Group className={styles.formGroup}>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            ref={imageUrlRef}
                            accept="image/*"
                        />
                        <small className="form-text text-muted">Upload an image of the place.</small>
                        {/* Display the image preview if available */}
                        {imagePreview && <img src={imagePreview} alt="Image Preview" className={styles.imagePreview} />}
                    </Form.Group>

                    {/* Error Message */}
                    {error && <div className="text-danger mt-2">{error}</div>}
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
