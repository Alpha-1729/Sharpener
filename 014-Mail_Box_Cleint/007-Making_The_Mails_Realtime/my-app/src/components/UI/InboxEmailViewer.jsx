import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { removeInboxEmail, markInboxEmailAsRead } from "../../store/emailActions";
import styles from "./InboxEmailViewer.module.css";

function InboxEmailViewer() {
    const { emailKey } = useParams();
    const email = useSelector(state => state.auth.email);

    const navigate = useNavigate();

    const inbox = useSelector((state) => state.email.inbox);
    const emailDetails = inbox.find((email) => email.id === emailKey);

    const markAsRead = async (email, emailDetails) => {
        await markInboxEmailAsRead(email, emailDetails);
    }

    markAsRead(email, emailDetails);

    const handleDelete = async () => {
        await removeInboxEmail(email, emailKey);
        navigate("/inbox");
    };

    return (
        <Container className={styles.viewerContainer}>
            <Button
                className={styles.backButton}
                onClick={() => navigate("/inbox")} // Navigate back to the inbox
            >
                &larr; Back to Inbox
            </Button>
            <Button className={styles.deleteButton} onClick={handleDelete}>
                Delete
            </Button>

            {emailDetails ? (
                <div className={styles.emailDetails}>
                    <div className={styles.header}>
                        <h2 className={styles.subject}>{emailDetails.subject || "No Subject"}</h2>

                    </div>
                    <p className={styles.sender}>
                        <strong>From:</strong> {emailDetails.sender || "Unknown Sender"}
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

export default InboxEmailViewer;
