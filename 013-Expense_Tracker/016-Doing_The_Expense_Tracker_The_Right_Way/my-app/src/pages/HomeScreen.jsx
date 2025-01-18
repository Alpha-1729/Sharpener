import React from "react";
import HomePage from "../components/HomePage";
import ExpenseTable from "../components/ExpenseTable";
import { useSelector } from "react-redux";

function HomeScreen() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return (
        <>
            <HomePage />
            {isAuthenticated && <ExpenseTable />}
        </>
    );
}

export default HomeScreen;