import React, { useContext } from 'react';
import { Box, Typography, CircularProgress, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextProvider';

const AccessDenied = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: "500px",
          bgcolor: "white",
          marginTop: "100px",
          width: "100%",
          px: "10px",
          pb: "10px",
          borderRadius: 5
        }}
      >
        <Typography sx={{ bgcolor: "white", textAlign: 'center'}} pb="10px" variant="subtitle2" mt={2}>
          You are not allowed to access this page{!user && ", Please log in"}
        </Typography>
        {user
          ? <Button variant="contained"  onClick={() => { navigate(-1) }}>Go back</Button>
          : <Button variant="contained"   onClick={() => { navigate(`/login`) }}>Login</Button>
        }
        <Box
          component='img'
          sx={{ width: "400px", mt: "10px" }}
          src={"https://dotesports.com/wp-content/uploads/2023/09/How-to-Use-Pepe-Emotes-on-Twitch.png"}></Box>
      </Container>

    </>
  );
};

export default AccessDenied;
