import React from 'react';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    background: {
      default: '#382e7f',
    },
    primary: {
      main: '#FFF3F3',
    },
    secondary: {
      main: '#FFCF60',
    },
    light: {
      main: '#FFFFFF',
    },
    grey: {
      main: '#F3F4FF',
    },
    text: {
      primary: '#2E2E2E',
    },
    icon: {
      main: '#1C89B6',
    },
    heart: {
      main: '#D74545',
    },
  },
  shadows: {
    0: 'none',
    1: 'rgba(0, 0, 0, 0.15) 0px 30px 14px',
    4: 'rgba(1, 1, 1, 0.15) 0px 30px 14px',
  },
  components: {
    MuiLinearProgress: {
      styleOverrides: {
        bar: {
          backgroundColor: '#382e7f',
        },
        root: {
          backgroundColor: '#E2E2E2',
          height: '10px',
          borderRadius: '15px',
        },
      },
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});
