import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Container, Row, Col, Button } from "react-bootstrap";
import styles from "./InboxPage.module.css";
import { fetchInboxEmails } from "../store/emailActions"; // Import the fetchInboxEmails function
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "../store/emailSlice";
import { removeInboxEmail } from "../store/emailActions";

const InboxPage = () => {
    const emails = useSelector((state) => state.email.inbox);
    const unreadCount = emails.filter((email) => !email.isRead).length; // Unread emails count
    const [error, setError] = useState(null);

    const userEmail = useSelector((state) => state.auth.email); // Get user email from Redux store
    const dispatch = useDispatch();

    const deleteMsgHandler = async (emailKey) => {
        const { response, error } = await removeInboxEmail(userEmail, emailKey);
        if (response) {
            dispatch(emailActions.deleteInboxEmail(emailKey));
        }
    };

    useEffect(() => {
        let intervalId;

        const fetchEmails = async () => {
            const { response, error } = await fetchInboxEmails(userEmail);
            if (response) {
                // Only update Redux state if emails have changed
                if (JSON.stringify(response) !== JSON.stringify(emails)) {
                    dispatch(emailActions.setInboxEmails(response));
                }
            } else {
                setError(error);
            }
        };

        // Fetch emails initially and set up polling
        fetchEmails();
        intervalId = setInterval(fetchEmails, 2000); // Poll every 2 seconds

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, [userEmail, emails, dispatch]);

    return (
        <Container className={styles.inboxContainer}>
            <Row>
                <Col>
                    <h2 className={styles.heading}>
                        Inbox {unreadCount > 0 && `(${unreadCount} unread)`}
                    </h2>
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
                                            {email.isRead === false && (
                                                <span className={styles.unreadDot}></span>
                                            )}
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
                                        {/* Render the HTML content */}
                                        <div
                                            className={styles.emailSnippet}
                                            dangerouslySetInnerHTML={{
                                                __html: email.content
                                                    ? email.content.slice(0, 100) + "..."
                                                    : "No Content",
                                            }}
                                        ></div>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        onClick={() => deleteMsgHandler(email.id)}
                                    >
                                        DELETE
                                    </Button>
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
