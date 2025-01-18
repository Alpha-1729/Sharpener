import { createSlice } from '@reduxjs/toolkit';

const initialExpenseState = {
    expenses: [],
    totalExpense: 0,
    showPremiumButton: false
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseState,
    reducers: {
        setExpense(state, action) {
            state.expenses = action.payload;
            state.totalExpense = state.expenses.reduce((total, expense) => total + expense.amount, 0);
            state.showPremiumButton = state.totalExpense > 10000;
        },
        addExpense(state, action) {
            state.expenses.push(action.payload);
            state.totalExpense += action.payload.amount;
            state.showPremiumButton = state.totalExpense > 10000;
        },
        removeExpense(state, action) {
            const removedExpense = state.expenses.find(exp => exp.id === action.payload);
            state.expenses = state.expenses.filter(exp => exp.id !== action.payload);
            if (removedExpense) {
                state.totalExpense -= removedExpense.amount;
            }
            state.showPremiumButton = state.totalExpense > 10000;
        },
        updateExpense(state, action) {
            const index = state.expenses.findIndex(exp => exp.id === action.payload.id);
            if (index !== -1) {
                const previousAmount = state.expenses[index].amount;
                state.expenses[index] = { ...state.expenses[index], ...action.payload.data };
                state.totalExpense += action.payload.data.amount - previousAmount;
            }
            state.showPremiumButton = state.totalExpense > 10000;
        },
    }
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;

export const selectShowPremiumButton = (state) => state.expense.showPremiumButton;
