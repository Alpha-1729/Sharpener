import React, { useContext, useRef, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import Axios for HTTP requests
import classes from './AuthForm.module.css'; // Optional for additional custom styling
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');

    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const API_KEY = 'AIzaSyDw_Z4NUqrIU9qjX8uY7h-E41ETrni_9sY';

    const clearFields = () => {
        emailRef.current.value = '';
        passwordRef.current.value = '';
        if (confirmPasswordRef.current) confirmPasswordRef.current.value = ''; // Check if confirmPasswordRef is not null
        setError('');
    };

    // Firebase Sign-Up function
    const signUp = async (email, password) => {
        try {
            const response = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            );
            const idToken = response.data.idToken;
            navigate("/auth");
        } catch (error) {
            setError('Sign-Up failed! Please try again.');
            console.error('Sign-Up Error:', error.response.data.error.message);
        }
    };

    const signIn = async (email, password) => {
        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const data = await response.json();
            const idToken = data.idToken; // Get the token
            authCtx.login(idToken, email);
            navigate("/");
        } catch (error) {
            setError('Sign-In failed! Please check your credentials and try again.');
            console.error('Sign-In Error:', error.response);
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredConfirmPassword = isSignUp ? confirmPasswordRef.current?.value : '';  // Only access when sign-up

        if (isSignUp && enteredPassword !== enteredConfirmPassword) {
            setError('Passwords do not match');
            return;
        }

        clearFields();

        if (isSignUp) {
            // Call the signUp function for signup
            await signUp(enteredEmail, enteredPassword);
        } else {
            // Call the signIn function for login
            await signIn(enteredEmail, enteredPassword);
        }
    };

    const toggleFormHandler = () => {
        setIsSignUp((prevState) => !prevState); // Toggle between Sign Up and Sign In
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Row className="w-100">
                <Col md={6} className="mx-auto">
                    <div className={classes.box}>
                        <h2 className="text-center mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    ref={emailRef}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="password" className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    minLength="7"
                                    ref={passwordRef}
                                    required
                                />
                            </Form.Group>

                            {isSignUp && (
                                <Form.Group controlId="confirmPassword" className="mb-4">
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        minLength="7"
                                        ref={confirmPasswordRef}
                                        required
                                    />
                                </Form.Group>
                            )}

                            {error && <p className="text-danger">{error}</p>}

                            <Button variant="primary" type="submit" className="w-100 mb-2">
                                {isSignUp ? 'Sign Up' : 'Sign In'}
                            </Button>
                        </Form>

                        <Button variant="link" className="d-block w-100 text-center" onClick={toggleFormHandler}>
                            {isSignUp ? 'Have an account? Login' : 'Don\'t have an account? Sign Up'}
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AuthForm;
