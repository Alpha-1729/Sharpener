import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import styles from "./AddExpenseModal.module.css";

function AddExpenseModal({ show, onClose, onSave }) {
    const amountRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    const handleSave = () => {
        const expenseData = {
            amount: amountRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
        };

        if (!expenseData.amount || !expenseData.description || !expenseData.category) {
            alert("All fields are required!");
            return;
        }

        onSave(expenseData);

        // Clear the input fields
        amountRef.current.value = "";
        descriptionRef.current.value = "";
        categoryRef.current.value = "";

        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} className={styles.modal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Expense</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Control
                            type="number"
                            placeholder="Enter amount spent"
                            ref={amountRef}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Enter expense description"
                            ref={descriptionRef}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Select ref={categoryRef}>
                            <option value="">Select a category</option>
                            <option value="Food">Food</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Salary">Salary</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Expense
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddExpenseModal;
