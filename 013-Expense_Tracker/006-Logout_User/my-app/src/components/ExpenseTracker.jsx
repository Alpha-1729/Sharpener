import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../store/auth-context";
import firebaseConfig from "../FirebaseConfig";
import styles from "./ExpenseTracker.module.css"; // Importing the CSS module

function ExpenseTracker() {
    const authCtx = useContext(AuthContext);
    const token = authCtx.token; // Firebase ID token from AuthContext
    const API_KEY = firebaseConfig.apiKey;

    const [isProfileComplete, setIsProfileComplete] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isEmailVerified, setIsEmailVerified] = useState(true);
    const [emailVerificationMessage, setEmailVerificationMessage] = useState("");
    const navigate = useNavigate();

    // Fetch user data from Firebase based on the ID token
    const getUserData = async () => {
        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
                {
                    method: "POST",
                    body: JSON.stringify({ idToken: token }), // Ensure correct token name
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            if (data.users && data.users.length > 0) {
                const user = data.users[0]; // We are dealing with a single user here
                setUserData(user);

                // Check if displayName or photoUrl is missing
                if (!user.displayName || !user.photoUrl) {
                    setIsProfileComplete(false);
                }

                // Check email verification status
                setIsEmailVerified(user.emailVerified);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Send email verification link
    const sendEmailVerification = async () => {
        if (!authCtx.isLoggedIn) {
            navigate('/auth');
        }
        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        requestType: "VERIFY_EMAIL",
                        idToken: token,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            if (response.ok) {
                setEmailVerificationMessage(
                    `Verification email sent to ${data.email}. Please check your inbox.`
                );
            } else {
                throw new Error(data.error.message || "Failed to send verification email.");
            }
        } catch (error) {
            setEmailVerificationMessage(error.message);
            authCtx.logout();
        }
    };

    useEffect(() => {
        if (token) {
            getUserData();
        }
    }, [token]);

    return (
        <div className={styles.container}>
            <h1>Welcome to Expense Tracker</h1>

            {/* Profile Incomplete Message */}
            {!isProfileComplete && (
                <div className={styles.profileIncompleteMessage}>
                    <p>
                        Your profile is incomplete.{" "}
                        <a href="/profile" className={styles.profileLink}>
                            Complete Profile
                        </a>
                    </p>
                </div>
            )}

            {/* Email Verification Message */}
            {!isEmailVerified && (
                <div className={styles.emailVerificationMessage}>
                    <p>
                        Your email is not verified.{" "}
                        <button onClick={sendEmailVerification} className={styles.verifyEmailButton}>
                            Verify Email
                        </button>
                    </p>
                    {emailVerificationMessage && (
                        <p className={styles.emailMessage}>{emailVerificationMessage}</p>
                    )}
                </div>
            )}

            <hr />
        </div>
    );
}

export default ExpenseTracker;
