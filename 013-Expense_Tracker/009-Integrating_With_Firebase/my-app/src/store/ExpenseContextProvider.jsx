import React, { useState, useCallback, useEffect, useContext } from "react";
import ExpenseContext from "./expense-context";
import AuthContext from "./auth-context";

function ExpenseContextProvider(props) {
    const authCtx = useContext(AuthContext);
    const sanitiseEmail = authCtx.email.replace(/[@.]/g, "");
    const BASE_URL = `https://react-http-2549b-default-rtdb.asia-southeast1.firebasedatabase.app/expensetracker/${sanitiseEmail}`;

    const [expenses, setExpenses] = useState([]);

    // Fetch expenses from Firebase on component mount
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch(`${BASE_URL}.json`);

                if (!response.ok) {
                    throw new Error("Failed to fetch expenses.");
                }

                const data = await response.json();

                const loadedExpenses = [];
                for (const key in data) {
                    loadedExpenses.push({ id: key, ...data[key] });
                }

                setExpenses(loadedExpenses);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchExpenses();
    }, []);

    // Add expense to Firebase and update state
    const addExpenseHandler = useCallback(async (expense) => {
        try {
            const response = await fetch(`${BASE_URL}.json`, {
                method: "POST",
                body: JSON.stringify(expense),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to add expense.");
            }

            const data = await response.json();
            setExpenses((prevExpenses) => [
                ...prevExpenses,
                { id: data.name, ...expense },
            ]);
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    // Remove expense from Firebase and update state
    const removeExpenseHandler = useCallback(async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}.json`, { method: "DELETE" });

            if (!response.ok) {
                throw new Error("Failed to remove expense.");
            }

            setExpenses((prevExpenses) =>
                prevExpenses.filter((expense) => expense.id !== id)
            );
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    // Update expense in Firebase and update state
    const updateExpenseHandler = useCallback(async (id, updatedExpense) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}.json`, {
                method: "PUT",
                body: JSON.stringify(updatedExpense),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to update expense.");
            }

            setExpenses((prevExpenses) =>
                prevExpenses.map((expense) =>
                    expense.id === id ? { id, ...updatedExpense } : expense
                )
            );
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    const contextValue = {
        expenses: expenses,
        addExpense: addExpenseHandler,
        removeExpense: removeExpenseHandler,
        updateExpense: updateExpenseHandler,
    };

    return (
        <ExpenseContext.Provider value={contextValue}>
            {props.children}
        </ExpenseContext.Provider>
    );
}

export default ExpenseContextProvider;
