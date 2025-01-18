import React, { useState, useRef } from 'react';
import FirebaseAuthServices from '../../services/firebase/firebaseAuthServices';
import styles from './PasswordResetForm.module.css';

function PasswordResetForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const emailRef = useRef('');

    const passwordResetHandler = async () => {
        const enteredEmail = emailRef.current.value;

        if (!enteredEmail.trim()) {
            setMessage('Please enter a valid email address.');
            setIsSuccess(false);
            return;
        }

        setLoading(true);
        setMessage('');

        const { response, error } = await FirebaseAuthServices.resetPassword(enteredEmail);

        if (error) {
            setMessage(error);
            setIsSuccess(false);
        } else {
            setMessage(`Password reset email sent to: ${enteredEmail}`);
            setIsSuccess(true);
        }

        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Reset Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                ref={emailRef}
                className={styles.input}
            />
            <button
                onClick={passwordResetHandler}
                className={styles.button}
                disabled={loading}
            >
                {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            {message && (
                <p className={`${styles.message} ${isSuccess ? styles.success : styles.error}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default PasswordResetForm;
