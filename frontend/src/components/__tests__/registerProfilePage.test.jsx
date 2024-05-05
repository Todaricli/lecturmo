import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import RegisterProfilePage from '../../pages/RegisterPage/RegisterProfilePage';

test('RegisterProfilePage component', () => {
    const { getByLabelText, getByText } = render(<RegisterProfilePage />);

    // Fill in the form fields
    fireEvent.change(getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(getByLabelText(/Last Name/i), { target: { value: 'Doe' } });

    // Select a gender option
    const genderSelect = getByLabelText(/Gender/i);
    fireEvent.mouseDown(genderSelect);
    fireEvent.click(getByText('Male'));

    // Submit the form
    fireEvent.click(getByText(/Register/i));
});
