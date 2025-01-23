import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import styles from "./OutboxPage.module.css";
import { fetchOutboxEmails } from "../store/emailActions"; // Adjust the action for fetching outbox emails
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "../store/emailSlice";

const OutboxPage = () => {
    console.log("Outbox page");
    const [emails, setEmails] = useState([]); // Initialize emails as an array
    const [error, setError] = useState(null);

    const userEmail = useSelector(state => state.auth.email); // Get user email from Redux store

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchEmails = async () => {
            const { response, error } = await fetchOutboxEmails(userEmail); // Fetch outbox emails
            if (response) {
                setEmails(response);
                dispatch(emailActions.setOutboxEmails(response));
            } else {
                setError(error); // Handle error
            }
        };

        fetchEmails(); // Fetch emails when the component mounts
    }, [userEmail]); // Re-run effect if the userEmail changes

    return (
        <Container className={styles.outboxContainer}>
            <Row>
                <Col>
                    <h2 className={styles.heading}>Outbox</h2>
                    {error && <p className={styles.error}>{error}</p>}
                    {emails.length === 0 ? (
                        <p className={styles.noEmails}>No emails found.</p>
                    ) : (
                        <ListGroup>
                            {emails.map((email) => (
                                <ListGroup.Item
                                    key={email.id}
                                    className={styles.emailRow}
                                >
                                    <Link
                                        to={`/outbox/${email.id}`}
                                        className={styles.emailLink}
                                    >
                                        <span className={styles.emailTo}>
                                            {email.recipient || "Unknown Recipient"}
                                        </span>
                                        <span className={styles.emailSubject}>
                                            {email.subject || "No Subject"}
                                        </span>
                                        <span className={styles.emailTimestamp}>
                                            {new Date(email.timestamp).toLocaleString() || "No Timestamp"}
                                        </span>
                                        <span className={styles.emailSnippet}>
                                            {email.content
                                                ? email.content.slice(0, 100) + "..."
                                                : "No Content"}
                                        </span>
                                    </Link>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default OutboxPage;
