import React, { useState, useCallback, useEffect } from "react";
import ExpenseContext from "./expense-context";

function ExpenseContextProvider(props) {
    const getExpensesData = () => {
        const storedExpenses = localStorage.getItem('expenses');
        return storedExpenses ? JSON.parse(storedExpenses) : [];
    };

    const [expenses, setExpenses] = useState(getExpensesData);

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    const addExpenseHandler = useCallback((expense) => {
        setExpenses((prevExpenses) => [...prevExpenses, expense]);
    }, []);

    const removeExpenseHandler = useCallback((id) => {
        setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== id));
    }, []);

    const updateExpenseHandler = useCallback((id, updatedExpense) => {
        setExpenses((prevExpenses) =>
            prevExpenses.map((expense) =>
                expense.id === id ? { ...expense, ...updatedExpense } : expense
            )
        );
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
