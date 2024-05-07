// import { test } from 'vitest'; // Destructure test from Vitest for cleaner syntax
// import useLocalStorage from '../../hooks/useLocalStorage';

// test('useLocalStorage hook', () => {
//   // Mock localStorage behavior (improved with clear separation)
//   const localStorageMock = {
//     getItem: (key) => this.store[key] || null,
//     setItem: (key, value) => { this.store[key] = value.toString(); },
//     removeItem: (key) => { delete this.store[key]; },
//     store: {}, // Initial empty storage
//   };

//   // Override the real localStorage with our mock during test execution
//   Object.defineProperty(window, 'localStorage', { value: localStorageMock });

//   // Test hook behavior
//   const key = 'testKey';
//   const initialValue = 'initialValue';
//   const newValue = 'newValue';

//   // Initialize hook with initial value
//   const [value, setValue] = useLocalStorage(key, initialValue);

//   // Assert initial value
//   expect(value).toBe(initialValue); // Use Vitest's `expect` assertion

//   // Update value using setValue function
//   setValue(newValue);

//   // Retrieve value from localStorage
//   const storedValue = localStorageMock.getItem(key);

//   // Assert that stored value matches the updated value
//   expect(storedValue).toBe(JSON.stringify(newValue)); // Use Vitest's `expect` assertion

//   // Clean up after the test (optional, not strictly necessary in this case)
//   // Object.defineProperty(window, 'localStorage', { value: undefined });
// });

// import { renderHook, act } from '@testing-library/react-hooks';
// import useLocalStorage from '../../hooks/useLocalStorage';

// describe('useLocalStorage', () => {
//   beforeEach(() => {
//     // Clear localStorage before each test to ensure a clean state
//     window.localStorage.clear();
//   });

//   test('should initialize with default value when localStorage is empty', () => {
//     const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));
//     expect(result.current[0]).toBe('defaultValue');
//   });

//   test('should initialize with value from localStorage if present', () => {
//     // Set a value in localStorage before rendering the hook
//     window.localStorage.setItem('testKey', JSON.stringify('storedValue'));
//     const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));
//     expect(result.current[0]).toBe('storedValue');
//   });

//   test('should update value in localStorage when setValue is called', () => {
//     const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));
//     act(() => {
//       result.current[1]('newValue');
//     });
//     expect(window.localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
//   });

//   test('should return updated value after calling setValue', () => {
//     const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));
//     act(() => {
//       result.current[1]('newValue');
//     });
//     expect(result.current[0]).toBe('newValue');
//   });

//   test('should handle parsing error and use default value', () => {
//     // Set an invalid JSON string in localStorage
//     window.localStorage.setItem('testKey', 'invalidJSON');
//     const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));
//     expect(result.current[0]).toBe('defaultValue');
//   });
// });

import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useLocalStorage from '../../hooks/useLocalStorage';

describe('useLocalStorage hook', () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key],
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
      removeItem: (key) => {
        delete store[key];
      },
    };
  })();

  // Mock localStorage in global object before each test
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  it('should store and retrieve value from localStorage', () => {
    const key = 'testKey';
    const initialValue = 'testValue';
    const { result } = renderHook(() => useLocalStorage(key, initialValue)); // Use renderHook from @testing-library/react-hooks

    // Ensure that the initial value is retrieved correctly
    expect(result.current[0]).toBe(initialValue);

    // Update the value using the setter function
    const updatedValue = 'updatedValue';
    act(() => {
      result.current[1](updatedValue);
    });

    // Ensure that the value is updated and stored in localStorage
    expect(result.current[0]).toBe(updatedValue);
    expect(localStorageMock.getItem(key)).toBe(updatedValue);
  });
});