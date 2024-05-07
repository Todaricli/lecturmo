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
    heart: {
      primary: '#D74545',
    },
    icon: {
      main: '#1C89B6',
    },
  },
  shadows: {
    0: 'none',
    1: 'rgba(0, 0, 0, 0.15) 0px 30px 14px',
    2: 'rgba(1, 1, 1, 0.15) 0px 30px 14px',
    3: 'rgba(1, 1, 1, 0.15) 0px 30px 14px',
    4: 'rgba(1, 1, 1, 0.15) 0px 30px 14px',
    5: 'rgba(1, 1, 1, 0.15) 0px 30px 14px',
    6: 'rgba(1, 1, 1, 0.15) 0px 30px 14px',
    7: 'rgba(1, 1, 1, 0.15) 0px 30px 14px',
    8: 'rgba(1, 1, 1, 0.15) 0px 30px 14px',
    9: 'rgba(1, 1, 1, 0.15) 0px 30px 14px',
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black !important',
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'black',
          },
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
