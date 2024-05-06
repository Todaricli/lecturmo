import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditProfilePage from '../../pages/ProfilePage/EditProfilePage';

test('EditProfilePage component', () => {
  const { getByLabelText, getByText } = render(<EditProfilePage />);

  // Fill in the name field
  fireEvent.change(getByLabelText(/Name/i), { target: { value: 'John Doe' } });

  // Select gender
  fireEvent.mouseDown(getByLabelText(/Gender/i));
  fireEvent.click(getByText('Male'));

  // Fill in the description field
  fireEvent.change(getByLabelText(/Description/i), {
    target: { value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  });

  // Submit the form
  fireEvent.click(getByText('Submit'));

});
