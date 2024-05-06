import React from 'react';
import {
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';

const Loading = ({ content = "Loading..." }) => {
  return <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress size={80} />
    <Typography variant="h6" mt={2}>
      {content}
    </Typography>
  </Box>
};

export default Loading;
