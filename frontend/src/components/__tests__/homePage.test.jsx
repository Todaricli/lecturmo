// import React from 'react';
// import { render, screen, cleanup } from '@testing-library/react';
// import HomePage from '../../pages/HomePage/HomePage.jsx';
// import { AuthContextProvider } from '../../contexts/AuthContextProvider.jsx';

// // Mock the AuthContext module
// jest.mock('../../contexts/AuthContextProvider.jsx', () => ({
//     AuthContext: {
//         Consumer: ({ children }) => children({
//             user: {id: 1,
//                 username: 'exampleUser',
//                 email: 'user@example.com'}, // Provide mock values as needed for testing
//             fetchUserDetails: jest.fn(),
//             isFetchUserLoading: false,
//             fetchUserError: null,
//         }),
//     },
// }));

// test('should render HomePage componenet', () => {
//     render(<HomePage />);
//     // const homePageElement = screen.getByTestId('home');
//     // expect(homePageElement).toBeInTheDocument();
//     // expect(homePageElement).toHaveTextContent('Hello Lectermo');

//     // Check if loading state is not rendered
//     expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

//     // Check if error state is not rendered
//     expect(screen.queryByText(/Error:/)).not.toBeInTheDocument();

//     // Check if page content is rendered
//     expect(screen.getByText('Hello Lectermo')).toBeInTheDocument();
//     expect(screen.getByTestId('search-bar')).toBeInTheDocument();
//     expect(screen.getByTestId('landing-posts')).toBeInTheDocument();
//     expect(screen.getByTestId('footer')).toBeInTheDocument();
// });

import { test } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '../../pages/HomePage/HomePage.jsx';

test('HomePage renders correctly', async ({ expect }) => {
    // Render the HomePage component
    const { getByText, getByTestId } = render(<HomePage />);
  
    // Assert that the "Hello Lectermo" text is rendered
    expect(getByText('Hello Lectermo')).toBeInTheDocument();
  
    // Assert that the SearchBar component is rendered
    expect(getByTestId('search-bar')).toBeInTheDocument();
  
    // Assert that the LandingPosts component is rendered
    expect(getByTestId('landing-posts')).toBeInTheDocument();
  
    // Assert that the Footer component is rendered
    expect(getByTestId('footer')).toBeInTheDocument();
  });