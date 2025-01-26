import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../store/Category/categorySlice";
import styles from "./CategoryModal.module.css";
import { addCategory, editCategory } from "../../store/Category/categoryActions";
import useImageUpload from "../../hooks/useImageUpload";

function CategoryModal({ showModal, handleClose, isEditing, currentCategory }) {
    const dispatch = useDispatch();

    const categoryNameRef = useRef("");
    const imageRef = useRef("");

    const [error, setError] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUploading, setImageUploading] = useState(false);

    const { uploadImage, isUploading, imageUrl, uploadError } = useImageUpload();

    useEffect(() => {
        if (isEditing) {
            categoryNameRef.current.value = currentCategory.name;
            setImagePreview(currentCategory.url);
        } else {
            setImagePreview(null);
        }
        setError("");
    }, [showModal, currentCategory]);

    const handleImageChange = () => {
        setImagePreview(null);
    };

    const handleSaveCategory = async () => {
        setError("");
        const enteredCategory = categoryNameRef.current.value.trim();
        if (!enteredCategory) {
            setError("Category name is required!");
            return;
        }

        if (!imagePreview && !imageRef.current.files.length) {
            setError("Category image is required!");
            return;
        }

        let imgUrl = null;
        if (imagePreview) {
            imgUrl = imagePreview;
        } else {
            // Handle image upload when a new file is selected
            const file = imageRef.current.files[0];
            if (file) {
                setImageUploading(true);
                try {
                    const uploadedImage = await uploadImage(file);
                    if (uploadError) {
                        setError(uploadError);
                        setImageUploading(false);
                        return;
                    }
                    imgUrl = uploadedImage.url;
                } catch (uploadError) {
                    setError("Failed to upload image.");
                    setImageUploading(false);
                    return;
                }
            }
        }

        const formData = {
            name: enteredCategory,
            url: imgUrl
        };

        setImageUploading(false); // Stop uploading indicator after image processing

        try {
            let response, categoryError;

            if (isEditing) {
                // Update existing category
                ({ response, categoryError } = await editCategory({
                    id: currentCategory.id,
                    ...formData
                }));
                if (!categoryError) {
                    dispatch(categoryActions.editCategory(response));
                }
            } else {
                // Add new category
                ({ response, categoryError } = await addCategory(formData));
                if (!categoryError) {
                    dispatch(categoryActions.addCategory(response));
                }
            }

            if (categoryError) {
                setError(categoryError);
            } else {
                handleClose(); // Close modal after successful save
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered className={styles.modalDialog}>
            <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title>{isEditing ? "Edit Category" : "Add Category"}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <Form>
                    <Form.Group>
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            type="text"
                            ref={categoryNameRef}
                            placeholder="Enter category name"
                        />
                        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                            type="file"
                            ref={imageRef}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        {imageUploading && <small>Uploading...</small>}
                        {error && <small className={styles.uploadError}>{error}</small>}
                        {imagePreview && !imageUploading && (
                            <a href={imagePreview} target="_blank" rel="noopener noreferrer">
                                Preview
                            </a>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
                <Button variant="secondary" onClick={handleClose} className={styles.closeButton}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSaveCategory}
                    className={styles.saveButton}
                    disabled={imageUploading}
                >
                    {isEditing ? "Update" : "Save"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CategoryModal;
