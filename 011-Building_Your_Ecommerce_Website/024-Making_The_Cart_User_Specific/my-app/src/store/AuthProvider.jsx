import React, { useState, useEffect, useCallback } from "react";
import AuthContext from './auth-context';
import axios from "axios";
import { useContext } from "react";
import CartContext from "./cart-context";

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
    const cartCtx = useContext(CartContext);

    const userEmail = userIsLoggedIn ? localStorage.getItem('email') : null;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('email');
    }, []);

    const loginHandler = async (token, email) => {
        setToken(token);
        const expiration = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes from now
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expiration.toISOString());
        localStorage.setItem('email', email);

        const sanitizedEmail = email.replace(/[@.]/g, "");
        const response = await axios.get(`https://crudcrud.com/api/a48bde08f0b34becb28e9229ff472b80/cart${sanitizedEmail}`);
        console.log(response);

        if (response.data.length > 0) {
            const cartData = response.data[0].data;
            cartCtx.setItem(cartData);
        }



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
        email: userEmail,
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
