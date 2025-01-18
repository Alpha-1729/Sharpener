import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import FirebaseAuthServices from '../../services/firebase/firebaseAuthServices';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import classes from './AuthForm.module.css';

const AuthForm = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');

    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clearFields = () => {
        emailRef.current.value = '';
        passwordRef.current.value = '';
        if (confirmPasswordRef.current) confirmPasswordRef.current.value = '';
        setError('');
    };

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = isSignUp ? confirmPasswordRef.current.value : '';

        if (isSignUp && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const { response, error } = isSignUp
            ? await FirebaseAuthServices.signUp(email, password)
            : await FirebaseAuthServices.signIn(email, password);


        if (error) {
            setError(error);
        } else {
            clearFields();
            if (!isSignUp) {
                dispatch(authActions.login({ token: response.idToken, email }));
                navigate('/');  // Navigate to home after sign-in
            } else {
                setIsSignUp(false);
            }
        }
    };

    const toggleFormHandler = () => {
        setIsSignUp((prev) => !prev);
        clearFields();
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Row className="w-100">
                <Col md={6} className="mx-auto">
                    <div className={classes.box}>
                        <h2 className="text-center mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
                        <Form onSubmit={formSubmitHandler}>
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

                        {!isSignUp && (
                            <Button variant="link" className="d-block w-100 text-center mb-2" onClick={() => navigate('/reset-password')}>
                                Forgot Password?
                            </Button>
                        )}

                        <Button variant="link" className="d-block w-100 text-center" onClick={toggleFormHandler}>
                            {isSignUp ? 'Have an account? Login' : "Don't have an account? Sign Up"}
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AuthForm;
