import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { authActions } from "../store/authSlice";
import FirebaseAuthServices from "../services/firebase/firebaseAuthServices"; // Import the service
import styles from "./HomePage.module.css"; // Importing the CSS module

function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.token);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isProfileComplete = useSelector((state) => state.auth.isProfileComplete);
    const isEmailVerified = useSelector((state) => state.auth.emailVerified);

    const [emailVerificationMessage, setEmailVerificationMessage] = useState("");

    const getUserData = async () => {
        if (token) {
            const { response, error } = await FirebaseAuthServices.getUserDetails(token);
            if (error) {
                console.error("Error fetching user data:", error);
            } else {
                if (response) {
                    dispatch(authActions.updateProfileStatus(!!(response.displayName && response.photoUrl)));
                    dispatch(authActions.updateEmailVerifiedStatus(response.emailVerified));
                }
            }
        }
    };

    const sendEmailVerification = async () => {
        if (!isAuthenticated) {
            navigate('/auth');
        }
        const { response, error } = await FirebaseAuthServices.sendEmailVerification(token);

        if (error) {
            setEmailVerificationMessage(error);
            dispatch(authActions.logout());
        } else {
            setEmailVerificationMessage(
                `Verification email sent to ${response.email}. Please check your inbox.`
            );
        }
    };

    const goToProfile = () => {
        navigate('/profile'); // Navigate to the profile page
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Welcome to Expense Tracker</h1>

            {isAuthenticated && !isProfileComplete && (
                <div className={styles.profileIncompleteMessage}>
                    <p>
                        Your profile is incomplete.{" "}
                        <button onClick={goToProfile} className={styles.profileLink}>
                            Complete Profile
                        </button>
                    </p>
                </div>
            )}

            {isAuthenticated && !isEmailVerified && (
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

export default HomePage;
