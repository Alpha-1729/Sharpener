import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";

import useSingleImageUpload from "../../hooks/useSingleImageUpload";
import { categoryActions } from "../../store/Category/categorySlice";
import { addCategory, editCategory } from "../../store/Category/categoryActions";
import ImagePreview from "../ImagePreview";

import styles from "./CategoryModal.module.css";

function CategoryModal({ showModal, handleClose, isEditing, currentCategory }) {
    const dispatch = useDispatch();

    const imageRef = useRef();
    const categoryNameRef = useRef();

    const { isUploading, uploadError, uploadSingleImage } = useSingleImageUpload();

    const [error, setError] = useState("");
    const [imagePreview, setImagePreview] = useState(currentCategory?.url || null);

    useEffect(() => {
        if (categoryNameRef.current) {
            categoryNameRef.current.value = currentCategory?.name || "";
        }
        setImagePreview(currentCategory?.url || null);
        setError("");
    }, [showModal]);

    const handleImageChange = () => {
        const file = imageRef.current.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSaveCategory = async () => {
        setError("");

        const enteredCategory = categoryNameRef.current.value.trim();

        if (!enteredCategory || !imagePreview) {
            setError("Category name and image are required!");
            return;
        }

        let imgUrl = imagePreview;
        if (imageRef.current.files.length) {
            const file = imageRef.current.files[0];
            imgUrl = await uploadSingleImage(file);
            if (!imgUrl) {
                setError(uploadError || "Image upload failed. Please try again.");
                return;
            }
        }

        const formData = { name: enteredCategory, url: imgUrl };

        try {
            if (isEditing) {
                const { response } = await editCategory({ id: currentCategory.id, ...formData });
                dispatch(categoryActions.editCategory(response));
            } else {
                const { response } = await addCategory(formData);
                dispatch(categoryActions.addCategory(response));
            }
            handleClose();
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
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                            type="file"
                            ref={imageRef}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        {imagePreview && !isUploading && <ImagePreview imgUrl={imagePreview} />}
                        {isUploading && <small className={styles.uploadingText}>Uploading...</small>}
                        {error && <small className={styles.error}>{error}</small>}
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
                    disabled={isUploading}
                >
                    {isEditing ? "Update" : "Save"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CategoryModal;
