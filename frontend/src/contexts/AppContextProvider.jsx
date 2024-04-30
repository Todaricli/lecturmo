import React, { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'; // Ensure this path is correct

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [data, setData] = useLocalStorage('appData', {
    settings: {},
    user: {},
  });

  // Function to update any part of the data by key
  const updateData = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Function to retrieve data by key
  const getData = (key) => {
    return data[key];
  };

  return (
    <AppContext.Provider value={{ data, updateData, getData }}>
      {children}
    </AppContext.Provider>
  );
}
