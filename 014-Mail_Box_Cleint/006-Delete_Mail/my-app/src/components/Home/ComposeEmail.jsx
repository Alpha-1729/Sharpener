import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import SendEmailModal from '../Modal/ComposeEmailModal'; // Modal Component for composing email
import styles from './ComposeEmail.module.css'; // Import the CSS Module

function ComposeEmail() {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Button className={styles.button} variant="secondary" onClick={handleShowModal}>
                Compose Email
            </Button>

            <SendEmailModal show={showModal} handleClose={handleCloseModal} />
        </>
    );
}

export default ComposeEmail;
