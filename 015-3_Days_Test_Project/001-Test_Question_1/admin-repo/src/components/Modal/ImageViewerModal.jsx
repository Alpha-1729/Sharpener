import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import styles from "./ImageViewerModal.module.css";

const ImageViewerModal = ({ show, onClose }) => {
    const images = useSelector((state) => state.images);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Image Viewer</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.imageContainer}>
                <img
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    className={styles.image}
                />
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Button
                    variant="secondary"
                    className={styles.navButton}
                    onClick={handlePrev}
                >
                    ◀ Previous
                </Button>
                <Button
                    variant="secondary"
                    className={styles.navButton}
                    onClick={handleNext}
                >
                    Next ▶
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ImageViewerModal;
