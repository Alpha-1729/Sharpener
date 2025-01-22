import React, { useState, useRef } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { addSentEmails, addInboxEmails } from "../../store/emailActions";
import styles from "./ComposeEmailModal.module.css";
import { useSelector } from "react-redux";
import draftToHtml from 'draftjs-to-html';


function ComposeEmailModal({ show, handleClose }) {
    const [recipientEmail, setRecipientEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [errorMessage, setErrorMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    const userEmail = useSelector(state => state.auth.email);
    const recipientEmailRef = useRef("");
    const subjectRef = useRef("");

    const sendEmailHandler = async () => {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const emailContent = draftToHtml(rawContentState);

        if (!recipientEmail || !subject) {
            setErrorMessage("Recipient email and subject are required.");
            return;
        }

        setIsSending(true);

        const timestamp = new Date().toISOString();

        try {
            await addSentEmails(userEmail, {
                recipient: recipientEmail,
                subject,
                content: emailContent,
                timestamp,
            });

            await addInboxEmails(recipientEmail, {
                sender: userEmail,
                subject,
                content: emailContent,
                timestamp,
            });

            setRecipientEmail("");
            setSubject("");
            setEditorState(EditorState.createEmpty());
            setErrorMessage("");
            handleClose();
        } catch {
            setErrorMessage("Failed to send email. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg" className={styles.modalContainer}>
            <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title>Send an Email</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <Form>
                    <Form.Group controlId="recipientEmail">
                        <FloatingLabel controlId="floatingRecipientEmail" label="To">
                            <Form.Control
                                type="email"
                                placeholder="To"
                                value={recipientEmail}
                                onChange={(e) => setRecipientEmail(e.target.value)}
                                ref={recipientEmailRef}
                                required
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group controlId="subject" className="mt-3">
                        <FloatingLabel controlId="floatingSubject" label="Subject">
                            <Form.Control
                                type="text"
                                placeholder="Enter subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                ref={subjectRef}
                                required
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group controlId="emailContent" className="mt-3">
                        <Form.Label>Email Content</Form.Label>
                        <div className={styles.editorWrapper}>
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                                toolbar={{
                                    options: ["inline", "blockType", "list", "textAlign", "link", "emoji", "history"],
                                    inline: {
                                        options: ["bold", "italic", "underline", "strikethrough"],
                                    },
                                }}
                            />
                        </div>
                    </Form.Group>
                    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={sendEmailHandler} disabled={isSending}>
                    {isSending ? "Sending..." : "Send Email"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ComposeEmailModal;
