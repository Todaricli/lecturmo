import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProfilePage from '../../pages/ProfilePage/UserProfilePage';

test('renders user profile page', () => {
  render(
    <MemoryRouter>
      <UserProfilePage />
    </MemoryRouter>
  );

  // Assert that important elements are present
  expect(screen.getByText(/Sheldon Sheldon/i)).toBeInTheDocument();
  expect(screen.getByText(/Email /i)).toBeInTheDocument();
  expect(screen.getByText(/Date of Birth/i)).toBeInTheDocument();
  expect(screen.getByText(/University /i)).toBeInTheDocument();
  expect(screen.getByText(/Gender/i)).toBeInTheDocument();
  expect(screen.getByText(/Bio/i)).toBeInTheDocument();
  expect(screen.getByText(/Links/i)).toBeInTheDocument();
  expect(screen.getByText(/Resend email verification/i)).toBeInTheDocument();
  expect(screen.getByText(/Edit profile/i)).toBeInTheDocument();
});

test('clicks on edit profile button', () => {
  const { getByText } = render(
    <MemoryRouter>
      <UserProfilePage />
    </MemoryRouter>
  );

//   Click the edit profile button
  fireEvent.click(screen.getByText('Edit profile'));

});

