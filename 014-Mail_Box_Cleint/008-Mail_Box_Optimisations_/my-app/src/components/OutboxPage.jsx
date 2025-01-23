import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import styles from "./OutboxPage.module.css";
import { fetchOutboxEmails } from "../store/emailActions";
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "../store/emailSlice";
import { useFetch } from "../hooks/useFetch";

const OutboxPage = () => {
    const userEmail = useSelector((state) => state.auth.email);
    const outbox = useSelector((state) => state.email.outbox);
    const dispatch = useDispatch();

    const { isFetching, fetchedData: emails, error } = useFetch(() => fetchOutboxEmails(userEmail), []);

    useEffect(() => {
        if (emails && emails.length > 0) {
            dispatch(emailActions.setOutboxEmails(emails));
        }
    }, [emails, dispatch]);

    let content;

    if (error) {
        content = <p className={styles.error}>{error.message}</p>;
    } else if (isFetching) {
        content = <p className={styles.loading}>Loading emails...</p>;
    } else if (!outbox || outbox.length === 0) {
        content = <p className={styles.noEmails}>No emails found.</p>;
    } else {
        content = (
            <ListGroup>
                {outbox.map((email) => (
                    <ListGroup.Item key={email.id} className={styles.emailRow}>
                        <Link to={`/outbox/${email.id}`} className={styles.emailLink}>
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
                                {email.content ? email.content.slice(0, 100) + "..." : "No Content"}
                            </span>
                        </Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        );
    }

    return (
        <Container className={styles.outboxContainer}>
            <Row>
                <Col>
                    <h2 className={styles.heading}>Outbox</h2>
                    {content}
                </Col>
            </Row>
        </Container>
    );
};

export default OutboxPage;
