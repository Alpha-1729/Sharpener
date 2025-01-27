import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form, FloatingLabel, FormCheck } from "react-bootstrap";

import useMultipleImageUpload from "../../hooks/useMutlipleImageUpload";
import { addListing, editListing } from "../../store/Listing/listingActions";
import { listingActions } from "../../store/Listing/listingSlice";
import ImagePreview from "../ImagePreview";

import styles from "./ListingModal.module.css";

function ListingModal({ showModal, handleClose, isEditing, currentListing }) {
    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();

    const categoryRef = useRef("");
    const fromDateRef = useRef("");
    const toDateRef = useRef("");
    const placeNameRef = useRef("");
    const pricePerNightRef = useRef("");
    const addressRef = useRef("");
    const cityRef = useRef("");
    const pincodeRef = useRef("");
    const descriptionRef = useRef("");
    const availabilityRef = useRef("");
    const imageRef = useRef("");

    const { isUploading, uploadError, uploadMultipleImages } = useMultipleImageUpload();

    const [error, setError] = useState("");
    const [imagePreview, setImagePreview] = useState(currentListing?.imgUrls || null);

    useEffect(() => {
        if (isEditing) {
            categoryRef.current.value = currentListing.category || "";
            fromDateRef.current.value = currentListing.fromDate || "";
            toDateRef.current.value = currentListing.toDate || "";
            placeNameRef.current.value = currentListing.placeName || "";
            pricePerNightRef.current.value = currentListing.pricePerNight || "";
            addressRef.current.value = currentListing.address || "";
            cityRef.current.value = currentListing.city || "";
            pincodeRef.current.value = currentListing.pincode || "";
            descriptionRef.current.value = currentListing.description || "";
            availabilityRef.current.checked = currentListing.isAvailable || false;
            if (currentListing.imageUrls) {
                setImagePreview(currentListing.imageUrls);
            }
        }
        setError("");
    }, [showModal]);

    const handleImageChange = () => {
        const files = imageRef.current.files;
        if (files) {
            const fileList = Array.from(files).map(file => URL.createObjectURL(file));
            setImagePreview(fileList);
        }
    };


    const handleSaveListing = async () => {
        setError("");

        if (
            !categoryRef.current.value ||
            !fromDateRef.current.value ||
            !toDateRef.current.value ||
            !placeNameRef.current.value ||
            !pricePerNightRef.current.value ||
            !addressRef.current.value ||
            !cityRef.current.value ||
            !pincodeRef.current.value ||
            !descriptionRef.current.value ||
            !availabilityRef.current.value ||
            !imageRef.current.files
        ) {
            setError("All fields are required!");
            return;
        }

        let imgUrls = imagePreview;

        if (imageRef.current.files.length) {
            const files = imageRef.current.files;
            imgUrls = await uploadMultipleImages(files);
            if (!imgUrls) {
                setError(uploadError || "Image upload failed. Please try again.");
                return;
            }
        }

        const formData = {
            category: categoryRef.current.value,
            fromDate: fromDateRef.current.value,
            toDate: toDateRef.current.value,
            placeName: placeNameRef.current.value,
            pricePerNight: +pricePerNightRef.current.value,
            address: addressRef.current.value,
            city: cityRef.current.value,
            pincode: pincodeRef.current.value,
            description: descriptionRef.current.value,
            isAvailable: availabilityRef.current.checked,
            imageUrls: imgUrls,
        };

        if (isEditing) {
            const { response, error } = await editListing({ id: currentListing.id, ...formData });
            dispatch(listingActions.editListing({ id: currentListing.id, updatedData: response }));
        } else {
            const { response, error } = await addListing(formData);
            dispatch(listingActions.addListing(response));
        }

        setError("");
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered className={styles.modalContainer}>
            <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title>{isEditing ? "Edit Listing" : "Add Listing"}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalContent}>
                <Form>
                    {/* Category */}
                    <Form.Group className={styles.formField}>
                        <Form.Label className={styles.formLabel}>Category</Form.Label>
                        <Form.Control as="select" ref={categoryRef} className={styles.formControl}>
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

                    {/* From Date and To Date */}
                    <div className={styles.flexRow}>
                        <Form.Group className={`${styles.flexItemHalf}`}>
                            <FloatingLabel label="From Date">
                                <Form.Control type="date" ref={fromDateRef} className={styles.formControl} />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className={`${styles.flexItemHalf}`}>
                            <FloatingLabel label="To Date">
                                <Form.Control type="date" ref={toDateRef} className={styles.formControl} />
                            </FloatingLabel>
                        </Form.Group>
                    </div>

                    {/* Place Name and Price */}
                    <div className={styles.flexRow}>
                        <Form.Group className={`${styles.flexItemHalf}`}>
                            <FloatingLabel label="Place Name">
                                <Form.Control
                                    type="text"
                                    ref={placeNameRef}
                                    placeholder="Enter place name"
                                    className={styles.formControl}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className={`${styles.flexItemHalf}`}>
                            <FloatingLabel label="Price per Night">
                                <Form.Control
                                    type="number"
                                    ref={pricePerNightRef}
                                    placeholder="Enter price"
                                    className={styles.formControl}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </div>

                    {/* Address, City, and Pincode */}
                    <Form.Group className={styles.formField}>
                        <FloatingLabel label="Address">
                            <Form.Control
                                type="text"
                                ref={addressRef}
                                placeholder="Enter address"
                                className={styles.formControl}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <div className={styles.flexRow}>
                        <Form.Group className={`${styles.flexItemHalf}`}>
                            <FloatingLabel label="City">
                                <Form.Control
                                    type="text"
                                    ref={cityRef}
                                    placeholder="Enter city"
                                    className={styles.formControl}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className={`${styles.flexItemHalf}`}>
                            <FloatingLabel label="Pincode">
                                <Form.Control
                                    type="text"
                                    ref={pincodeRef}
                                    placeholder="Enter pincode"
                                    className={styles.formControl}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </div>

                    {/* Description */}
                    <Form.Group className={styles.formField}>
                        <FloatingLabel label="Description">
                            <Form.Control
                                as="textarea"
                                rows={7}
                                ref={descriptionRef}
                                placeholder="Enter a description"
                                className={styles.textArea}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    {/* Availability */}
                    <Form.Group className={styles.formField}>
                        <div className={styles.flexRow}>
                            <Form.Label className={styles.formLabel}>Availability</Form.Label>
                            <FormCheck type="switch" ref={availabilityRef} className={styles.formSwitch} />
                        </div>
                    </Form.Group>

                    {/* Image */}
                    <Form.Group className={styles.formField}>
                        <Form.Label className={styles.formLabel}>Upload Image</Form.Label>
                        <Form.Control
                            type="file"
                            ref={imageRef}
                            accept="image/*"
                            multiple
                            className={styles.formControl}
                            onChange={handleImageChange}
                        />

                    </Form.Group>

                    {imagePreview && !isUploading && <ImagePreview imgUrls={imagePreview} />}
                    {isUploading && <small className={styles.uploadingText}>Uploading...</small>}
                    {error && <small className={styles.errorText}>{error}</small>}
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
