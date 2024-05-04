import { test, expect } from 'vitest';
import vitest from 'vitest';
import useGet from '../../hooks/useGet'; 
import axios from 'axios';

test('useGet custom hook', async () => {
  const mockData = { message: 'Mock data' };
  const url = 'https://example.com/api/data';
  // Mock axios.get to return a promise with mock data
  jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData });

  // Render a functional component that uses the useGet hook
  const { result, waitForNextUpdate } = await test(<Component />, { environment: 'jsdom' });

  // Wait for the hook to fetch data
  await waitForNextUpdate();

  // Assert that data is fetched successfully
  expect(result.current.data).toEqual(mockData);
  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toBe(false);
});

const Component = () => {
  const { data, isLoading, error } = useGet('https://example.com/api/data');
  return null; // Return null since we're only testing the hook
};