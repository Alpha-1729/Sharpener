import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { categoryActions } from "../store/Category/categorySlice";
import { deleteCategory, fetchAllCategories } from "../store/Category/categoryActions";
import CategoryModal from "../components/Modal/CategoryModal";
import CategoryItem from "../components/CategoryItem";
import styles from "./CategoryPage.module.css";

function CategoryPage() {
    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();

    const [modalState, setModalState] = useState({
        showModal: false,
        isEditing: false,
        currentCategory: null,
    });

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            const { response, error } = await fetchAllCategories();
            if (error) throw new Error("Failed to fetch categories");
            dispatch(categoryActions.setCategories(response));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [dispatch]);

    // Open or edit category modal
    const openModal = () => {
        setModalState({
            showModal: true,
            isEditing: false,
            currentCategory: null,
        });
    };

    const editModal = (category) => {
        setModalState({
            showModal: true,
            isEditing: true,
            currentCategory: category,
        });
    };

    // Close the modal
    const closeModal = () => {
        setModalState({ ...modalState, showModal: false });
    };

    // Handle category deletion
    const handleDeleteCategory = async (categoryId) => {
        try {
            const { response, error } = await deleteCategory(categoryId);
            if (error) throw new Error("Failed to delete category");
            dispatch(categoryActions.deleteCategory(categoryId));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.categoryPage}>
            <h1 className={styles.pageHeading}>Categories</h1>
            <Button className={styles.addButton} onClick={() => openModal()}>
                Add Category
            </Button>

            {/* No categories found */}
            {categories.length === 0 && <p>No categories found</p>}

            {/* List of categories */}
            {categories.length > 0 && (
                <div className={styles.categoryList}>
                    {categories.map((category) => (
                        <CategoryItem
                            key={category.id}
                            category={category}
                            onEdit={editModal}
                            onDelete={handleDeleteCategory}
                        />
                    ))}
                </div>
            )}

            {/* Category Modal */}
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
