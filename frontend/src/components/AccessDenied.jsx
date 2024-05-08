import React from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const navigate = useNavigate()
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',  
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: "white"
        }}
      >

        <Typography variant="h6" mt={2}>
          You are not allowed to access this page, Please log in
        </Typography>
        <Button variant="contained" onClick={() => { navigate(`/login`) }}>Login</Button>
        <img src={"https://dotesports.com/wp-content/uploads/2023/09/How-to-Use-Pepe-Emotes-on-Twitch.png"}></img>
      </Box>
      
    </>
  );
};

export default AccessDenied;
