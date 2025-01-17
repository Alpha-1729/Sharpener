import firebaseConfig from '../../FirebaseConfig';
import React, { useState } from "react";
import styles from "./PasswordResetForm.module.css";

function PasswordResetForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const API_KEY = firebaseConfig.apiKey;

    const handlePasswordReset = async () => {
        if (!email) {
            setMessage("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setMessage("");

        const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;
        const payload = {
            requestType: "PASSWORD_RESET",
            email: email,
        };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Password reset email sent to: ${data.email}`);
            } else {
                const errorData = await response.json();
                setMessage(errorData.error.message || "Failed to send password reset email.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Reset Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
            />
            <button
                onClick={handlePasswordReset}
                className={styles.button}
                disabled={loading}
            >
                {loading ? "Sending..." : "Send Reset Link"}
            </button>
            {message && (
                <p
                    className={`${styles.message} ${message.includes("sent") ? styles.success : styles.error
                        }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
}

export default PasswordResetForm;
