import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../store/Category/categorySlice";
import styles from "./CategoryModal.module.css";
import { addCategory, editCategory } from "../../store/Category/categoryActions";

function CategoryModal({ showModal, handleClose, isEditing, currentCategory }) {
    const [categoryName, setCategoryName] = useState(currentCategory?.name || "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const handleSaveCategory = async () => {
        if (!categoryName.trim()) {
            setError("Category name is required!");
            return;
        }

        try {
            let response, error;
            if (isEditing) {
                ({ response, error } = await editCategory({ id: currentCategory.id, name: categoryName }));
                if (!error) dispatch(categoryActions.editCategory(response));
            } else {
                ({ response, error } = await addCategory(categoryName));
                if (!error) dispatch(categoryActions.addCategory({ id: response.id, name: response.name }));
            }

            if (error) {
                setError(error);
            } else {
                handleClose();
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        }
    };

    useEffect(() => {
        setCategoryName(currentCategory?.name || "");
        setError("");
    }, [showModal, currentCategory]);

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
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Enter category name"
                            isInvalid={!!error}
                        />
                        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
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
                >
                    {isEditing ? "Update" : "Save"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CategoryModal;
