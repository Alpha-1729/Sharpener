import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import styles from "./InboxPage.module.css";
import { getReceivedEmails } from "../store/emailActions"; // Import the getSentEmails function
import { useSelector } from "react-redux";

const InboxPage = () => {
    console.log("Inbox page");
    const [emails, setEmails] = useState([]); // Ensure emails is initialized as an array
    const [error, setError] = useState(null);

    const userEmail = useSelector(state => state.auth.email); // Get user email from Redux store

    useEffect(() => {
        const fetchEmails = async () => {
            const { response, error } = await getReceivedEmails(userEmail);
            if (response) {
                // Transforming response data into an array of emails
                const loadedEmails = Object.keys(response).map((key) => ({
                    id: key,
                    ...response[key], // Spread the fields of each email object
                }));

                console.log(loadedEmails);
                setEmails(loadedEmails);
            } else {
                setError(error); // Handle error
                setEmails([]); // Reset emails if there's an error
            }
        };

        fetchEmails(); // Fetch emails when the component mounts
    }, [userEmail]); // Re-run effect if the userEmail changes

    return (
        <Container className={styles.inboxContainer}>
            <Row>
                <Col>
                    <h2 className={styles.heading}>Inbox</h2>
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
                                        to={`/inbox/${email.id}`}
                                        className={styles.emailLink}
                                    >
                                        <span className={styles.emailFrom}>
                                            {email.sender || "Unknown Sender"}
                                        </span>
                                        <span className={styles.emailSubject}>
                                            {email.subject || "No Subject"}
                                        </span>
                                        <span className={styles.emailTimestamp}>
                                            {new Date(email.timestamp).toLocaleString() || "No Timestamp"}
                                        </span>
                                        <span className={styles.emailSnippet}>
                                            {/* Truncate the email content */}
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

export default InboxPage;
