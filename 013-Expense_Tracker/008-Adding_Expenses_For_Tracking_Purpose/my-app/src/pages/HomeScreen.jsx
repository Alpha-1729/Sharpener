import React from "react";
import HomePage from "../components/HomePage";
import ExpenseContextProvider from "../store/ExpenseContextProvider";
import ExpenseTable from "../components/ExpenseTable";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

function HomeScreen() {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    return <>
        <HomePage />
        {isLoggedIn && <ExpenseContextProvider>
            <ExpenseTable />
        </ExpenseContextProvider>}
    </>
}

export default HomeScreen;