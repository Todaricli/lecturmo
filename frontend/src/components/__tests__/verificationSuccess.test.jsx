import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import VerificationSuccessPage from '../../pages/ScanVerificationPage/VerificationSuccessPage';

test('VerificationErrorPage component', () => {
    // Render the VerificationErrorPage component
    const { getByTestId } = render(<VerificationSuccessPage />);
  
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


