import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './contexts/AppContextProvider.jsx';
import { AuthContextProvider } from './contexts/AuthContextProvider.jsx';
import '@radix-ui/themes/styles.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './layouts/GlobalTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetches on new instance query mount, window refocus, network reconnect
      staleTime: 60000,
      // garbage collection, removes unnecessary  data from cache
      gcTime: 10 * (60 * 1000),
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
              <ToastContainer position="bottom-right" autoClose={2000} />
            </ThemeProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </AuthContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);
