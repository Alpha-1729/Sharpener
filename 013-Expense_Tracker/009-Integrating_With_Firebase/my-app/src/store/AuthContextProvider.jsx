import React, { useCallback, useState } from "react";
import AuthContext from "./auth-context";

function AuthContextProvider(props) {
    const getAuthData = () => {
        const storedToken = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        if (!storedToken || !email) {
            return null;
        }

        return { token: storedToken, email: email };
    }

    const authData = getAuthData();
    const initialToken = authData ? authData.token : null;
    const userEmail = authData ? authData.email : null;
    const [token, setToken] = useState(initialToken);
    const isUserLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }, []);

    const loginHandler = async (token, email) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
    }

    const contextValue = {
        token: token,
        email: userEmail,
        isLoggedIn: isUserLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider >
    );
}

export default AuthContextProvider;