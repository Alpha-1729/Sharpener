import React, { useContext, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import styles from "./AddExpenseModal.module.css";
import ExpenseContext from "../../store/expense-context";

function AddExpenseModal({ show, onClose, expenseData }) {
    const amountRef = useRef("");
    const descriptionRef = useRef("");
    const categoryRef = useRef("");
    const expenseCtx = useContext(ExpenseContext);

    const isEditing = !!expenseData; // Check if expenseData is provided (editing mode)

    useEffect(() => {
        if (isEditing) {
            // Prefill the fields with current expense data
            amountRef.current.value = expenseData.amount || "";
            descriptionRef.current.value = expenseData.description || "";
            categoryRef.current.value = expenseData.category || "";
        }
    }, [expenseData, isEditing]);

    const handleSubmit = () => {
        const updatedData = {
            amount: amountRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
        };

        // Validate input fields
        if (!updatedData.amount || !updatedData.description || !updatedData.category) {
            alert("All fields are required!");
            return;
        }

        if (isEditing) {
            expenseCtx.updateExpense(expenseData.id, updatedData);
        } else {
            expenseCtx.addExpense(updatedData);
        }

        // Close the modal
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} className={styles.modal}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? "Update Expense" : "Add Expense"}</Modal.Title>
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
                <Button variant="primary" onClick={handleSubmit}>
                    {isEditing ? "Update Expense" : "Save Expense"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddExpenseModal;
