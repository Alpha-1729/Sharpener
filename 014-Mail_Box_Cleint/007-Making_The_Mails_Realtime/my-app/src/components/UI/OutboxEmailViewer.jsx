import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs"; // Trash icon for delete
import styles from "./OutboxEmailViewer.module.css";
import { removeOutboxEmail } from "../../store/emailActions";
import { useSelector } from "react-redux";
// import { fetchSingleEmail, deleteEmail } from "../store/emailActions"; // Assume deleteEmail is an action to delete the email

function OutboxEmailViewer() {
    const { emailKey } = useParams();
    const email = useSelector(state => state.auth.email);

    const navigate = useNavigate();

    const outbox = useSelector((state) => state.email.outbox);
    const emailDetails = outbox.find((email) => email.id === emailKey);

    const handleDelete = async () => {
        await removeOutboxEmail(email, emailKey);
        navigate("/outbox");
    };

    return (
        <Container className={styles.viewerContainer}>
            <Button
                className={styles.backButton}
                onClick={() => navigate("/outbox")} // Navigate back to the outbox
            >
                &larr; Back to Outbox
            </Button>
            <Button className={styles.deleteButton} onClick={handleDelete}>
                Delete
            </Button>
            {emailDetails ? (
                <div className={styles.emailDetails}>
                    <div className={styles.header}>
                        <h2 className={styles.subject}>{emailDetails.subject || "No Subject"}</h2>

                    </div>
                    <p className={styles.recipient}>
                        <strong>To:</strong> {emailDetails.recipient || "Unknown Sender"}
                    </p>
                    <p className={styles.timestamp}>
                        <strong>Date:</strong> {new Date(emailDetails.timestamp).toLocaleString() || "Unknown Date"}
                    </p>
                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{
                            __html: emailDetails.content || "No Content Available",
                        }}
                    ></div>
                </div>
            ) : (
                <p>Loading email...</p>
            )}
        </Container>
    );
}

export default OutboxEmailViewer;
