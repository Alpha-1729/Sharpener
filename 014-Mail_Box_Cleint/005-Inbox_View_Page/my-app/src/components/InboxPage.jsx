import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import styles from "./InboxPage.module.css";
import { fetchInboxEmails } from "../store/emailActions"; // Import the getSentEmails function
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "../store/emailSlice";

const InboxPage = () => {
    console.log("Inbox page");
    const [emails, setEmails] = useState([]); // Ensure emails is initialized as an array
    const [error, setError] = useState(null);

    const userEmail = useSelector(state => state.auth.email); // Get user email from Redux store

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchEmails = async () => {
            const { response, error } = await fetchInboxEmails(userEmail);
            if (response) {
                setEmails(response);
                dispatch(emailActions.setInboxEmails(response));
            } else {
                setError(error); // Handle error
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
                                        <div className={styles.emailLeft}>
                                            {/* Blue dot for unread emails */}
                                            {email.isRead === false && <span className={styles.unreadDot}></span>}
                                        </div>
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
