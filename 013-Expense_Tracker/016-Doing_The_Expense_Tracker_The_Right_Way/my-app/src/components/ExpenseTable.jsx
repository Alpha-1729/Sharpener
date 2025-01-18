import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expenseSlice";
import FirebaseExpenseServices from "../services/firebase/firebaseExpenseServices.js";
import styles from './ExpenseTable.module.css';
import AddExpenseModal from "./Modal/AddExpenseModal";

function ExpenseTable() {
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const expenses = useSelector(state => state.expense.expenses); // Redux state for expenses
    const showPremiumButton = useSelector(state => state.expense.showPremiumButton); // Selector for the premium button visibility
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [currentExpense, setCurrentExpense] = useState(null); // Expense being edited

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const fetchedExpenses = await FirebaseExpenseServices.fetchExpenses(email);
                dispatch(expenseActions.setExpense(fetchedExpenses));
            } catch (error) {
                console.error("Failed to fetch expenses:", error);
            }
        };

        fetchExpenses();
    }, [dispatch]);

    const handleAddExpense = async (newExpense) => {
        try {
            const addedExpense = await FirebaseExpenseServices.addExpense(email, newExpense);
            dispatch(expenseActions.addExpense(addedExpense));
            setShowModal(false); // Close modal after adding
        } catch (error) {
            console.error("Failed to add expense:", error);
        }
    };

    const handleUpdateExpense = async (updatedExpense) => {
        try {
            await FirebaseExpenseServices.updateExpense(email, updatedExpense.id, updatedExpense);
            dispatch(expenseActions.updateExpense({ id: updatedExpense.id, data: updatedExpense }));
            setShowModal(false); // Close modal after updating
        } catch (error) {
            console.error("Failed to update expense:", error);
        }
    };

    const handleEditExpense = (expense) => {
        setCurrentExpense(expense); // Set the expense for editing
        setShowModal(true); // Open modal
    };

    const handleRemoveExpense = async (id) => {
        try {
            await FirebaseExpenseServices.removeExpense(email, id);
            dispatch(expenseActions.removeExpense(id));
        } catch (error) {
            console.error("Failed to remove expense:", error);
        }
    };

    const handleActivatePremium = () => {
        // Logic for activating premium (could be a dispatch or API call)
        console.log("Premium Activated");
    };

    return (
        <div className={styles.tableContainer}>
            <h2 className={styles.heading}>Expenses</h2>
            <button
                className={styles.addButton}
                onClick={() => {
                    setCurrentExpense(null); // Clear current expense for adding new
                    setShowModal(true); // Show modal for new expense
                }}
            >
                Add Expense
            </button>

            {showPremiumButton && (
                <button
                    className={styles.premiumButton}
                    onClick={handleActivatePremium}
                >
                    Activate Premium
                </button>
            )}

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
