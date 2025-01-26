import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, FloatingLabel } from "react-bootstrap";

import { signInUser } from "../../store/Auth/authActions";
import { authActions } from "../../store/Auth/authSlice";

import styles from "./LoginForm.module.css";

function LoginForm() {
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRedirect = (path) => navigate(path);

    const submitHandler = async (event) => {
        event.preventDefault();

        setErrorMessage("");

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        const { response, error } = await signInUser(enteredEmail, enteredPassword);

        if (error) {
            setErrorMessage(error);
            return;
        }

        dispatch(
            authActions.login({
                token: response.idToken,
                email: response.email,
            })
        );

        navigate("/home");
    };

    return (
        <Container className={styles.container}>
            <Card className={styles.card}>
                <Card.Body>
                    <h2 className={styles.cardTitle}>Login</h2>
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

                        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

                        <Button variant="primary" type="submit" className={styles.button}>
                            Login
                        </Button>

                        <div className={styles.forgotPassword} onClick={() => handleRedirect("/forgot-password")}>
                            Forgot Password?
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <div className={styles.loginLink} onClick={() => handleRedirect("/sign-up")}>
                Create an Account
            </div>
        </Container>
    );
}

export default LoginForm;
