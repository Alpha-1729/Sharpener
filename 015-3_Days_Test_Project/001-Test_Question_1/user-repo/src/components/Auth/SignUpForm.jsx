import React, { useRef, useState } from "react";
import { Container, Form, Button, Card, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../store/Auth/authActions";
import styles from "./SignUpForm.module.css";

function SignUpForm() {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredConfirmPassword = confirmPasswordRef.current.value;

        if (enteredPassword !== enteredConfirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        const { response, error } = await signUpUser(enteredEmail, enteredPassword);

        if (error) {
            setErrorMessage(error);
            return;
        }

        setErrorMessage("");
        navigate("/login");
    };

    return (
        <Container className={styles.container}>
            <Card className={styles.card}>
                <Card.Body>
                    <h2 className={styles.cardTitle}>Sign Up</h2>
                    <Form onSubmit={submitHandler}>
                        <FloatingLabel controlId="formEmail" label="Email" className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                ref={emailRef}
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="formPassword" label="Password" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                ref={passwordRef}
                                minLength={7}
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="formConfirmPassword" label="Confirm Password" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Confirm your password"
                                name="confirmPassword"
                                ref={confirmPasswordRef}
                                minLength={7}
                                required
                            />
                        </FloatingLabel>

                        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

                        <Button variant="primary" type="submit" className={styles.button}>
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className={styles.loginLink} onClick={handleLoginRedirect}>
                Have an account? Login
            </div>
        </Container>
    );
}

export default SignUpForm;
