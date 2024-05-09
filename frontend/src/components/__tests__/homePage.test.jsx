import { test } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../../pages/HomePage/HomePage.jsx';
import { MemoryRouter } from 'react-router-dom';
import Loading from '../Loading.jsx';
import SearchBar from '../SearchBar.jsx';

test('renders home page with initial loading state', async () => {
  // Mock initialLoad as true to simulate loading state
  const initialLoad = true;

  // Render the HomePage component with initialLoad set to true
  await render(
    <MemoryRouter>
      <HomePage initialLoad={initialLoad} />
    </MemoryRouter>
  );

  // Assert that the loading component is rendered
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});


test('displays success snackbar when open state is true', async () => {
  // Mock initialLoad as false to simulate loaded state
  const initialLoad = false;

  // Mock open state as true to simulate success snackbar being displayed
  const open = true;

  // Render the HomePage component with initialLoad set to false and open set to true
  await render(
    <MemoryRouter>
      <HomePage initialLoad={initialLoad} open={open} />
    </MemoryRouter>
  );
});


