import { test } from 'vitest'; // Destructure test from Vitest for cleaner syntax
import useLocalStorage from '../../hooks/useLocalStorage';

test('useLocalStorage hook', () => {
  // Mock localStorage behavior (improved with clear separation)
  const localStorageMock = {
    getItem: (key) => this.store[key] || null,
    setItem: (key, value) => { this.store[key] = value.toString(); },
    removeItem: (key) => { delete this.store[key]; },
    store: {}, // Initial empty storage
  };

  // Override the real localStorage with our mock during test execution
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  // Test hook behavior
  const key = 'testKey';
  const initialValue = 'initialValue';
  const newValue = 'newValue';

  // Initialize hook with initial value
  const [value, setValue] = useLocalStorage(key, initialValue);

  // Assert initial value
  expect(value).toBe(initialValue); // Use Vitest's `expect` assertion

  // Update value using setValue function
  setValue(newValue);

  // Retrieve value from localStorage
  const storedValue = localStorageMock.getItem(key);

  // Assert that stored value matches the updated value
  expect(storedValue).toBe(JSON.stringify(newValue)); // Use Vitest's `expect` assertion

  // Clean up after the test (optional, not strictly necessary in this case)
  // Object.defineProperty(window, 'localStorage', { value: undefined });
});
