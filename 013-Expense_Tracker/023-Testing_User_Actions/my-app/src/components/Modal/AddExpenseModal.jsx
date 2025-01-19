import React, { useEffect, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expenseSlice";
import FirebaseExpenseServices from "../../services/firebase/firebaseExpenseServices.js";
import styles from "./AddExpenseModal.module.css";

function AddExpenseModal({ show, onClose, expenseData }) {
    const amountRef = useRef("");
    const descriptionRef = useRef("");
    const categoryRef = useRef("");

    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);

    const isEditing = !!expenseData;

    useEffect(() => {
        if (isEditing) {
            amountRef.current.value = expenseData.amount || "";
            descriptionRef.current.value = expenseData.description || "";
            categoryRef.current.value = expenseData.category || "";
        }
    }, [expenseData, isEditing]);

    const submitHandler = async () => {
        const updatedData = {
            amount: amountRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
        };

        if (!updatedData.amount || !updatedData.description || !updatedData.category) {
            alert("All fields are required!");
            return;
        }

        try {
            if (isEditing) {
                await FirebaseExpenseServices.updateExpense(email, expenseData.id, updatedData);
                dispatch(expenseActions.updateExpense({ id: expenseData.id, data: updatedData }));
            } else {
                const newExpense = await FirebaseExpenseServices.addExpense(email, updatedData);

                dispatch(expenseActions.addExpense(newExpense));
            }

            onClose();
        } catch (error) {
            console.error("Failed to save expense:", error.message);
        }
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
                <Button variant="primary" onClick={submitHandler}>
                    {isEditing ? "Update Expense" : "Save Expense"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddExpenseModal;
