import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import useGet from '../../hooks/useGet';

jest.mock('axios'); // Mock axios module

describe('useGet custom hook', () => {
  it('fetches data successfully', async () => {
    // Mock axios.get to return a resolved promise with mock data
    axios.get.mockResolvedValueOnce({ data: { foo: 'bar' } });

    // Render the hook with a mocked URL
    const { result, waitForNextUpdate } = renderHook(() => useGet('https://example.com'));

    // Verify that isLoading is initially true
    expect(result.current.isLoading).toBe(true);

    // Wait for the hook to complete its async operation
    await waitForNextUpdate();

    // Verify that isLoading becomes false after data is fetched
    expect(result.current.isLoading).toBe(false);

    // Verify that data is set correctly
    expect(result.current.data).toEqual({ foo: 'bar' });

    // Verify that error is false
    expect(result.current.error).toBe(false);
  });

  it('handles errors gracefully', async () => {
    // Mock axios.get to return a rejected promise
    axios.get.mockRejectedValueOnce(new Error('Request failed'));

    // Render the hook with a mocked URL
    const { result, waitForNextUpdate } = renderHook(() => useGet('https://example.com'));

    // Verify that isLoading is initially true
    expect(result.current.isLoading).toBe(true);

    // Wait for the hook to complete its async operation
    await waitForNextUpdate();

    // Verify that isLoading becomes false after request completes
    expect(result.current.isLoading).toBe(false);

    // Verify that data is null
    expect(result.current.data).toBe(null);

    // Verify that error is true
    expect(result.current.error).toBe(true);
  });
});
