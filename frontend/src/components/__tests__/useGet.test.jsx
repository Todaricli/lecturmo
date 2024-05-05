import { test, expect } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import useGet from '../../hooks/useGet'; // Adjust the path as per your project structure

test('useGet hook', async () => {
  // Mock axios.get to return a promise with mock data
  const mockData = { message: 'Mock data' };
  jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });

  // Render the hook
  const { result, waitForNextUpdate } = renderHook(() => useGet('/api/data'));

  // Wait for the hook to fetch data
  await waitForNextUpdate();

  // Assert the initial state
  expect(result.current.data).toBeNull();
  expect(result.current.isLoading).toBe(true);
  expect(result.current.error).toBe(false);

  // Wait for the loading state to be false
  await waitForNextUpdate();

  // Assert the updated state after data fetching
  expect(result.current.data).toEqual(mockData);
  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toBe(false);
});
