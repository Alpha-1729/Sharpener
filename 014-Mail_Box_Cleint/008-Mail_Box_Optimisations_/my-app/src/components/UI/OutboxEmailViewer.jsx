import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import styles from "./OutboxEmailViewer.module.css";
import { removeOutboxEmail } from "../../store/emailActions";
import { useSelector, useDispatch } from "react-redux";
import { emailActions } from "../../store/emailSlice";

function OutboxEmailViewer() {
    const { emailKey } = useParams();
    const userEmail = useSelector((state) => state.auth.email);
    const outbox = useSelector((state) => state.email.outbox);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailDetails = useMemo(() => {
        return outbox.find((email) => email.id === emailKey);
    }, [outbox, emailKey]);

    const handleDelete = async () => {
        try {
            await removeOutboxEmail(userEmail, emailKey);
            dispatch(emailActions.deleteOutboxEmail(emailKey));
            navigate("/outbox");
        } catch (error) {
            console.error("Failed to delete email:", error);
        }
    };

    return (
        <Container className={styles.viewerContainer}>
            <Button className={styles.backButton} onClick={() => navigate("/outbox")}>
                &larr; Back to Outbox
            </Button>
            <Button className={styles.deleteButton} onClick={handleDelete}>
                Delete
            </Button>

            {/* Conditional rendering without a ternary operator */}
            {emailDetails && (
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
            )}

            {!emailDetails && <p>Loading email...</p>}
        </Container>
    );
}

export default OutboxEmailViewer;
