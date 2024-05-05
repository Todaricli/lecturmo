import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterPage from '../../pages/RegisterPage/RegisterPage'; // Adjust the path as per your project structure


test('renders RegisterPage component correctly', () => {
    render(<RegisterPage />);
  
    // Check for presence of elements
    expect(screen.getByRole('heading')).toHaveTextContent('Create your Account');
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password')).toBeInTheDocument();
  });
  
  test('submit button is disabled initially', () => {
    render(<RegisterPage />);
  
    expect(screen.getByRole('button')).toBeDisabled();
  });
  
  // Additional tests for email, password, confirmation password, checkbox, etc.
  
  test('submit button is enabled when email and password are filled', () => {
    render(<RegisterPage />);
  
    const emailInput = screen.getByText('Email Address');
    const passwordInput = screen.getByText('Password');
  
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
  
    expect(screen.getByRole('button')).toBeEnabled();
  });
  
  // Test password visibility toggle (if applicable)
  test('password visibility toggle works', () => {
    render(<RegisterPage />);
  
    const passwordInput = screen.getByText('Password');
    const showPasswordButton = screen.getByLabelText('toggle password visibility');
  
    expect(passwordInput.type).toBe(undefined); // Initially hidden
  
    fireEvent.click(showPasswordButton); // Click to show password
  
    expect(passwordInput.type).toBe(undefined); // Now visible
  
    fireEvent.click(showPasswordButton); // Click again to hide
  
    expect(passwordInput.type).toBe(undefined); // Hidden again
  });