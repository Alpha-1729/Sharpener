import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import styles from "./SentPage.module.css";

const SentPage = () => {
    const [sentEmails, setSentEmails] = useState([]);

    useEffect(() => {
        const db = getDatabase(); // Initialize Firebase Database
        const sentEmailsRef = ref(db, "sentEmails"); // Replace 'sentEmails' with your database path

        // Fetch sent emails from Firebase
        const unsubscribe = onValue(sentEmailsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert object to array
                const loadedEmails = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setSentEmails(loadedEmails);
            } else {
                setSentEmails([]);
            }
        });

        return () => unsubscribe(); // Clean up the listener on component unmount
    }, []);

    return (
        <Container className={styles.sentContainer}>
            <Row>
                <Col>
                    <h2 className={styles.heading}>Sent Emails</h2>
                    {sentEmails.length === 0 ? (
                        <p className={styles.noEmails}>No sent emails found.</p>
                    ) : (
                        <ListGroup>
                            {sentEmails.map((email) => (
                                <ListGroup.Item
                                    key={email.id}
                                    className={styles.emailRow}
                                >
                                    <Link
                                        to={`/sent/${email.id}`}
                                        className={styles.emailLink}
                                    >
                                        <span className={styles.emailTo}>
                                            To: {email.to || "Unknown Recipient"}
                                        </span>
                                        <span className={styles.emailSnippet}>
                                            {email.body
                                                ? email.body.slice(0, 50) + "..."
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

export default SentPage;
