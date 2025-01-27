import React, { useState, useEffect } from "react";
import { fetchAllCategories } from "../store/Category/categoryActions";  // Adjust this import to your file structure
import styles from "./CategorySlider.module.css";

const CategorySlider = () => {
    const [categories, setCategories] = useState([]);
    const [startIndex, setStartIndex] = useState(0);

    // Fetch categories from Firebase
    useEffect(() => {
        const fetchCategories = async () => {
            const { response, error } = await fetchAllCategories();
            if (response) {
                setCategories(response);
            } else {
                console.error(error);  // Handle error appropriately
            }
        };

        fetchCategories();
    }, []);

    // Handle previous navigation
    const handlePrev = () => {
        setStartIndex((prevIndex) =>
            prevIndex - 1 < 0 ? categories.length - 1 : prevIndex - 1
        );
    };

    // Handle next navigation
    const handleNext = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % categories.length);
    };

    // Get the 4 images to display (if categories are loaded)
    const displayedImages = categories.length > 0 ? [
        categories[startIndex],
        categories[(startIndex + 1) % categories.length],
        categories[(startIndex + 2) % categories.length],
        categories[(startIndex + 3) % categories.length],
    ] : [];

    // Auto-slide functionality
    useEffect(() => {
        const autoSlideInterval = setInterval(() => {
            handleNext();
        }, 3000); // Auto-slide every 3 seconds

        return () => clearInterval(autoSlideInterval); // Clean up on unmount
    }, [categories]);

    return (
        <div className={styles.sliderContainer}>
            {/* Left Arrow Button */}
            <button className={`${styles.arrowButton} ${styles.prevButton}`} onClick={handlePrev}>
                &#8592;
            </button>

            {/* Image Row (Categories) */}
            <div className={styles.imageRow}>
                {displayedImages.map((category, index) => (
                    <a
                        href={`/category?category=${category.name}`}
                        key={index}
                        className={styles.imageLink}
                    >
                        <img
                            // Use category.imageUrl directly to get images from categories
                            src={category.url}
                            alt={category.name}
                            className={styles.image}
                        />
                        <div className={styles.caption}>{category.name}</div>
                    </a>
                ))}
            </div>

            {/* Right Arrow Button */}
            <button className={`${styles.arrowButton} ${styles.nextButton}`} onClick={handleNext}>
                &#8594;
            </button>
        </div>
    );
};

export default CategorySlider;
