import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthForm from './AuthForm';
import { jest } from '@jest/globals';

describe('AuthForm Component', () => {
  // Test 1: Component Renders Correctly
  test('should render the form with email and password fields', () => {
    render(<AuthForm />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  // Test 2: Form submission with empty fields should show an error
  test('should show an error when submitting an empty form', async () => {
    render(<AuthForm />);

    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(screen.getByText('Both fields are required')).toBeInTheDocument();
    });
  });

  // Test 3: Form submission with filled fields should navigate
  test('should navigate to setup page when form is correctly filled', async () => {
    render(<AuthForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/setup');
    });
  });

  // Test 4: Toggle form between sign up and sign in
  test('should toggle form between sign up and sign in', () => {
    render(<AuthForm />);
    fireEvent.click(screen.getByText("Don't have an account? Sign Up"));
    expect(screen.getByText('Sign Up')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Have an account? Login'));
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  // Test 5: Ensure that the sign-up form text displays correctly
  test('should display "Sign Up" when the toggle is clicked', () => {
    render(<AuthForm />);
    fireEvent.click(screen.getByText("Don't have an account? Sign Up"));
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  // Test 6: Check that email input changes correctly
  test('should update the email field when typing', () => {
    render(<AuthForm />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    expect(screen.getByPlaceholderText('Email').value).toBe('test@example.com');
  });

  // Test 7: Check that password input changes correctly
  test('should update the password field when typing', () => {
    render(<AuthForm />);
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    expect(screen.getByPlaceholderText('Password').value).toBe('password123');
  });

  // Test 8: Check the form error message when no email is entered
  test('should show error message when email is empty', async () => {
    render(<AuthForm />);
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(screen.getByText('Both fields are required')).toBeInTheDocument();
    });
  });

  // Test 9: Check the form error message when no password is entered
  test('should show error message when password is empty', async () => {
    render(<AuthForm />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(screen.getByText('Both fields are required')).toBeInTheDocument();
    });
  });

  // Test 10: Check if Sign In button is disabled when fields are empty
  test('should disable the Sign In button when fields are empty', () => {
    render(<AuthForm />);
    const signInButton = screen.getByText('Sign In');
    expect(signInButton).toBeDisabled();
  });
});
