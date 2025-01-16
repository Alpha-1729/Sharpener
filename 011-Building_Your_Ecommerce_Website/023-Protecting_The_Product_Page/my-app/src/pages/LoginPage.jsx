import React from "react";
import StoreNavBar from "../components/StoreNavBar";
import AuthForm from "../components/Auth/AuthForm";
function LoginPage() {
    return (
        <>
            <StoreNavBar handleCartShow={() => { }} />
            <AuthForm />
        </>
    );

}


export default LoginPage;