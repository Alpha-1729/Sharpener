import React, { useContext, useState } from "react";
import ExpenseContext from "../store/expense-context";
import styles from './ExpenseTable.module.css';
import AddExpenseModal from "./Modal/AddExpenseModal";

function ExpenseTable() {
    const { expenses, removeExpense, updateExpense, addExpense } = useContext(ExpenseContext);
    const [showModal, setShowModal] = useState(false); // State to toggle modal visibility

    const handleUpdate = (id) => {
        const updatedExpense = {
            description: prompt('Enter new description:'),
            amount: parseFloat(prompt('Enter new amount:')),
            category: prompt('Enter new category:')
        };

        if (updatedExpense.description && updatedExpense.amount && updatedExpense.category) {
            updateExpense(id, updatedExpense);
        }
    };

    const handleAddExpense = (newExpense) => {
        addExpense(newExpense);
        setShowModal(false); // Close the modal after adding expense
    };

    return (
        <div className={styles.tableContainer}>
            <h2 className={styles.heading}>Expenses</h2>
            <button className={styles.addButton} onClick={() => setShowModal(true)}>Add Expense</button>

            {/* Modal for adding an expense */}
            <AddExpenseModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleAddExpense}
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
                                <td>
                                    ${expense.amount ? parseFloat(expense.amount).toFixed(2) : '0.00'}
                                </td>
                                <td>{expense.category}</td>
                                <td>
                                    <button
                                        className={styles.updateButton}
                                        onClick={() => handleUpdate(expense.id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() => removeExpense(expense.id)}
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
