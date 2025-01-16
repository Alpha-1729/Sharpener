import React, { useState, useEffect, useCallback } from "react";
import AuthContext from './auth-context';

function AuthContextProvider(props) {
    const calculateRemainingTime = (expirationTime) => {
        const currentTime = new Date().getTime();
        const adjustedExpirationTime = new Date(expirationTime).getTime();
        return adjustedExpirationTime - currentTime;
    };

    const retrieveStoredToken = () => {
        const storedToken = localStorage.getItem('token');
        const storedExpiration = localStorage.getItem('expiration');

        if (!storedToken || !storedExpiration) {
            return null;
        }

        const remainingTime = calculateRemainingTime(storedExpiration);

        // If the token has already expired
        if (remainingTime <= 0) {
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
            return null;
        }

        return { token: storedToken, duration: remainingTime };
    };

    const tokenData = retrieveStoredToken();
    const initialToken = tokenData ? tokenData.token : null;
    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }, []);

    const loginHandler = (token) => {
        setToken(token);
        const expiration = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes from now
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expiration.toISOString());

        const remainingTime = calculateRemainingTime(expiration.toISOString());

        // Set a timer to auto-logout after the token expires
        setTimeout(logoutHandler, remainingTime);
    };

    useEffect(() => {
        if (tokenData) {
            setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
