import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../../pages/LoginPage/LoginPage';

test('renders login page with form inputs', () => {
  // Render the LoginPage component
  render(<LoginPage />);

  // Find the email input field
  const emailInput = screen.getByLabelText(/Email Address/i);

  // Simulate user entering an email address
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  // Verify that the email input field has the correct value
  expect(emailInput).toHaveValue('test@example.com');

  // Find the password input field
  const passwordInput = screen.getByLabelText(/Password/i);

  // Simulate user entering a password
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Verify that the password input field has the correct value
  expect(passwordInput).toHaveValue('password123');

  // Find the submit button
  const submitButton = screen.getByRole('button', { name: /Login/i });

  // Simulate clicking the submit button
  fireEvent.click(submitButton);

  // Verify that the login attempt is logged
  expect(console.log).toHaveBeenCalledWith(
    'Login Attempt with:',
    'test@example.com',
    'password123'
  );
});
