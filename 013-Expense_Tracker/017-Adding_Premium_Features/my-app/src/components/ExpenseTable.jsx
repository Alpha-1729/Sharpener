import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../store/expenseSlice';
import { themeActions } from '../store/themeSlice';  // Import the themeActions action
import FirebaseExpenseServices from '../services/firebase/firebaseExpenseServices.js';
import styles from './ExpenseTable.module.css';
import AddExpenseModal from './Modal/AddExpenseModal';

function ExpenseTable() {
    const dispatch = useDispatch();
    const email = useSelector((state) => state.auth.email);
    const expenses = useSelector((state) => state.expense.expenses);
    const isPremiumActivated = useSelector((state) => state.expense.isPremiumActivated);
    const showPremiumButton = useSelector((state) => state.expense.showPremiumButton);
    const currentTheme = useSelector((state) => state.theme.theme); // Get current theme from state
    const [showModal, setShowModal] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);

    // Toggle theme on button click
    const handleThemeToggle = () => {
        dispatch(themeActions.toggleTheme());
    };

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const fetchedExpenses = await FirebaseExpenseServices.fetchExpenses(email);
                dispatch(expenseActions.setExpense(fetchedExpenses));
            } catch (error) {
                console.error('Failed to fetch expenses:', error);
            }
        };

        fetchExpenses();
    }, [dispatch]);

    const handleAddExpense = async (newExpense) => {
        try {
            const addedExpense = await FirebaseExpenseServices.addExpense(email, newExpense);
            dispatch(expenseActions.addExpense(addedExpense));
            setShowModal(false);
        } catch (error) {
            console.error('Failed to add expense:', error);
        }
    };

    const handleUpdateExpense = async (updatedExpense) => {
        try {
            await FirebaseExpenseServices.updateExpense(email, updatedExpense.id, updatedExpense);
            dispatch(expenseActions.updateExpense({ id: updatedExpense.id, data: updatedExpense }));
            setShowModal(false);
        } catch (error) {
            console.error('Failed to update expense:', error);
        }
    };

    const handleEditExpense = (expense) => {
        setCurrentExpense(expense);
        setShowModal(true);
    };

    const handleRemoveExpense = async (id) => {
        try {
            await FirebaseExpenseServices.removeExpense(email, id);
            dispatch(expenseActions.removeExpense(id));
        } catch (error) {
            console.error('Failed to remove expense:', error);
        }
    };

    const handleActivatePremium = () => {
        dispatch(expenseActions.activatePremium());
        dispatch(themeActions.toggleTheme());
        console.log('Premium Activated');
    };

    // Function to download expenses as CSV
    const handleDownloadCSV = () => {
        const headers = ['Description', 'Amount', 'Category'];
        const rows = expenses.map(expense => [
            expense.description,
            parseFloat(expense.amount).toFixed(2),
            expense.category,
        ]);

        let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
        rows.forEach(row => {
            csvContent += row.join(",") + "\n";
        });

        // Create a download link and trigger click
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "expenses.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={`${styles.tableContainer} ${styles[currentTheme]}`}> {/* Apply theme class */}
            <h2 className={styles.heading}>Expenses</h2>

            <button
                className={styles.addButton}
                onClick={() => {
                    setCurrentExpense(null);
                    setShowModal(true);
                }}
            >
                Add Expense
            </button>

            {!isPremiumActivated && showPremiumButton && (
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
                expenseData={currentExpense}
            />
            {isPremiumActivated &&
                <label className={styles.toggleLabel}>
                    <input
                        type="checkbox"
                        className={styles.toggleCheckbox}
                        checked={currentTheme === 'dark'}
                        onChange={handleThemeToggle}
                    />
                    <span className={styles.toggleSlider}></span>
                </label>
            }
            {
                isPremiumActivated && expenses.length > 0 && 
                <button
                    className={styles.downloadButton}
                    onClick={handleDownloadCSV}
                >
                    Download Expenses
                </button>
            }



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
