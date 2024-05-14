import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VerificationErrorPage from '../../pages/ScanVerificationPage/VerificationErrorPage';
import { MemoryRouter } from 'react-router-dom';


test('VerificationErrorPage component', () => {
    // Render the VerificationErrorPage component
    const { getByTestId } = render(<MemoryRouter>
      <VerificationErrorPage />
      </MemoryRouter>);
  
    // Assert that the container element is rendered
    const container = getByTestId('background-container');
    expect(container).toBeInTheDocument();
  
    // Assert that other elements are rendered using getByTestId
    const iconElement = getByTestId('error-icon');
    expect(iconElement).toBeInTheDocument();
  
    const titleElement = getByTestId('error-title');
    expect(titleElement).toBeInTheDocument();
  
    const contentElement = getByTestId('error-content');
    expect(contentElement).toBeInTheDocument();
  
    const buttonElement = getByTestId('try-again-button');
    expect(buttonElement).toBeInTheDocument();
  });


