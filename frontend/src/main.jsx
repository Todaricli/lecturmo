import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './contexts/AppContextProvider.jsx';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <Theme>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </Theme>
      </BrowserRouter>
    </AppContextProvider>
  </React.StrictMode>
);
