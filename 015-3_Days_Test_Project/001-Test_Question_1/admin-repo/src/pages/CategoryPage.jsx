import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import { categoryActions } from "../store/Category/categorySlice";
import { deleteCategory, fetchAllCategories } from "../store/Category/categoryActions";
import CategoryModal from "../components/Modal/CategoryModal";
import styles from "./CategoryPage.module.css";

function CategoryPage() {
    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();

    const [modalState, setModalState] = useState({
        showModal: false,
        isEditing: false,
        currentCategory: null,
    });

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

    const openModal = (isEditing = false, category = null) => {
        setModalState({
            showModal: true,
            isEditing,
            currentCategory: category,
        });
    };

    const closeModal = () => setModalState((prev) => ({ ...prev, showModal: false }));

    const handleDeleteCategory = async (categoryId) => {
        const { error } = await deleteCategory(categoryId);
        if (!error) {
            dispatch(categoryActions.deleteCategory({ id: categoryId }));
        } else {
            console.error("Failed to delete category", error);
        }
    };

    return (
        <div className={styles.categoryPage}>
            <h1 className={styles.pageHeading}>Categories</h1>
            <Button className={styles.addButton} onClick={() => openModal()}>Add Category</Button>

            {categories.length === 0 ? (
                <p>No categories found</p>
            ) : (
                <ListGroup className={styles.categoryList}>
                    {categories.map((category) => (
                        <ListGroup.Item key={category.id} className={styles.categoryItem}>
                            <div className={styles.categoryText}>{category.name}</div>
                            <div className={styles.categoryActions}>
                                <Button
                                    className={styles.editButton}
                                    onClick={() => openModal(true, category)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    className={styles.deleteButton}
                                    onClick={() => handleDeleteCategory(category.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}

            <CategoryModal
                showModal={modalState.showModal}
                handleClose={closeModal}
                isEditing={modalState.isEditing}
                currentCategory={modalState.currentCategory}
            />
        </div>
    );
}

export default CategoryPage;
