import React, { useContext, useRef, useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import classes from './AuthForm.module.css'; // Import the custom CSS module
import AuthContext from '../../store/auth-context';
import firebaseConfig from '../../FirebaseConfig';

const AuthForm = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');

    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const API_KEY = firebaseConfig.apiKey; // Replace with your Firebase API key

    const clearFields = () => {
        emailRef.current.value = '';
        passwordRef.current.value = '';
        if (confirmPasswordRef.current) confirmPasswordRef.current.value = '';
        setError('');
    };

    const signUp = (email, password) => {
        fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (!data.idToken) {
                    throw new Error(data.error.message || 'Sign-Up failed!');
                }
                navigate('/auth');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const signIn = (email, password) => {
        fetch(
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
        )
            .then((response) => response.json())
            .then((data) => {
                if (!data.idToken) {
                    throw new Error(data.error.message || 'Sign-In failed!');
                }
                authCtx.login(data.idToken, email);
                navigate('/');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredConfirmPassword = isSignUp ? confirmPasswordRef.current?.value : '';

        if (isSignUp && enteredPassword !== enteredConfirmPassword) {
            setError('Passwords do not match');
            return;
        }

        clearFields();

        if (isSignUp) {
            signUp(enteredEmail, enteredPassword);
        } else {
            signIn(enteredEmail, enteredPassword);
        }
    };

    const toggleFormHandler = () => {
        setError('');
        setIsSignUp((prevState) => !prevState);
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
                                <InputGroup>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        minLength="7"
                                        ref={passwordRef}
                                        required
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputGroup>
                            </Form.Group>

                            {isSignUp && (
                                <Form.Group controlId="confirmPassword" className="mb-4">
                                    <InputGroup>
                                        <Form.Control
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Confirm Password"
                                            minLength="7"
                                            ref={confirmPasswordRef}
                                            required
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        >
                                            {showConfirmPassword ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputGroup>
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
