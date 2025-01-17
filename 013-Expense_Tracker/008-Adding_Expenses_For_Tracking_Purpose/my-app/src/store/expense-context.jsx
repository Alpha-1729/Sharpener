import React from "react";

const ExpenseContext = React.createContext({
    expenses: [],
    addExpense: (expense) => { },
    removeExpense: (id) => { },
    updateExpense: (id, updatedExpense) => { },
});

export default ExpenseContext;
