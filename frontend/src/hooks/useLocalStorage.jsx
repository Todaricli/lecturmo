import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

// Define a custom hook called useLocalStorage
const useLocalStorage = (key, initialValue = null) => {
  // Use the useState hook to define state for the value
  const [value, setValue] = useState(() => {
    try {
      // Attempt to retrieve data from localStorage based on the provided key
      const data = window.localStorage.getItem(key);
      // Parse the retrieved data from JSON format, or use the provided initialValue if data is not found
      return data ? JSON.parse(data) : initialValue;
    } catch {
      // If an error occurs during parsing or retrieval, use the provided initialValue
      return initialValue;
    }
  });

  // Use the useEffect hook to store the updated value in localStorage whenever it changes
  useEffect(() => {
    // Store the value in localStorage as a JSON string, using the provided key
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue]); // useEffect depends on value and setValue

  // Return the current value and a function to update it
  return [value, setValue];
};

export default useLocalStorage;
