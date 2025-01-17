import React, { useContext, useState } from "react";
import ExpenseContext from "../store/expense-context";
import styles from './ExpenseTable.module.css';
import AddExpenseModal from "./Modal/AddExpenseModal";

function ExpenseTable() {
    const { expenses, addExpense, removeExpense, updateExpense } = useContext(ExpenseContext);
    const [showModal, setShowModal] = useState(false); // State to toggle modal visibility
    const [currentExpense, setCurrentExpense] = useState(null); // State to hold current expense for editing

    // Add new expense using context
    const handleAddExpense = (newExpense) => {
        addExpense(newExpense);
        setShowModal(false); // Close the modal after adding expense
    };

    // Update an existing expense
    const handleUpdateExpense = (updatedExpense) => {
        updateExpense(updatedExpense.id, updatedExpense);
        setShowModal(false); // Close the modal after updating expense
    };

    // Open modal for updating an expense
    const handleEditExpense = (expense) => {
        setCurrentExpense(expense); // Set the current expense for editing
        setShowModal(true); // Open the modal
    };

    // Remove an expense using context
    const handleRemoveExpense = (id) => {
        removeExpense(id);
    };

    return (
        <div className={styles.tableContainer}>
            <h2 className={styles.heading}>Expenses</h2>
            <button
                className={styles.addButton}
                onClick={() => {
                    setCurrentExpense(null); // Clear current expense for adding new expense
                    setShowModal(true);
                }}
            >
                Add Expense
            </button>

            {/* Modal for adding or updating an expense */}
            <AddExpenseModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleAddExpense}
                onUpdate={handleUpdateExpense}
                expenseData={currentExpense} // Pass current expense for editing
            />

            {expenses.length === 0 ? (
                <p className={styles.noExpenses}>No expenses found</p>
            ) : (
                <table className={styles.expenseTable}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td>{expense.description}</td>
                                <td>${parseFloat(expense.amount).toFixed(2)}</td>
                                <td>{expense.category}</td>
                                <td>
                                    <button
                                        className={styles.updateButton}
                                        onClick={() => handleEditExpense(expense)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() => handleRemoveExpense(expense.id)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ExpenseTable;
