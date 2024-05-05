import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// NEED TO ADJUST CORS POLICY HERE TO ALLOW CREDENTIALS
axios.defaults.withCredentials = true;

const defaultTheme = createTheme();

const ReactQueryExamplePage = () => {
  const { user, loginUser, logoutUser, fetchUserDetails, updateUserDetails } =
    useContext(AuthContext);

  let userInfo = user;

  const handleLogin = async () => {
    const body = {
      username: 'user2',
      password: '123',
    };
    await loginUser(JSON.stringify(body)); // refetches the postLogin here
  };

  const handleLogout = async () => {
    await logoutUser();
  };

  const handleFetch = async () => {
    await fetchUserDetails();
  };

  const handleUpdate = async () => {
    await updateUserDetails();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Hi, Welcome Back! 👋
          </Typography>

          <p>
            Update is just a get request to backend to get user details, and
            bring it into the frontend. ALWAYS use when updating user info
          </p>
          <p>
            Fetch will only request backend IF user is not already in the
            context. ALWAYS use at the top of page if you need user info
          </p>
          <p>
            The reason for this is to reduce backend requests everytime we need
            user info
          </p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login Button
          </Button>

          {userInfo && <p>{JSON.stringify(userInfo)}</p>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleFetch}
          >
            Fetch Button
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleUpdate}
          >
            Update Button
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogout}
          >
            Logout Button
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ReactQueryExamplePage;

// // fetch example with outside api CANNOT USE BECAUSE CANNOT ADJUST THE CORS POLICY HERE, if you want to test, comment out the axios.defaults above
// const { isPending: idPendingDog, isError: isErrDog, data: dogData, error: dogError } = useQuery({
//   queryKey: ['dog'],
//   queryFn: async () => {
//     // const res = await axios.get("https://dog.ceo/api/breeds/image/random")
//     // return res.data
//     return 1
//   }
// })

// tan query login example, with fetch status dependant on the current user

// const { status: loginStatus, data: loginRes, refetch: postLogin } = useQuery({
//   queryKey: ['postLogin'],
//   queryFn: async () => {
//     const res = await axios.post('http://localhost:3000/api/auth/login', {
//       username: 'user2',
//       password: '123'
//     });
//     return res.data
//   },
//   enabled: false, // Initially, the query is disabled
// })

// const loggedIn = loginRes?.message

// const { data: userInfo } = useQuery({
//   queryKey: ['getLoginUser'],
//   queryFn: async () => {
//     const res = await axios.get('http://localhost:3000/api/auth/status');
//     console.log("res:", res)
//     return res.data
//   },
//   enabled: !!loggedIn, // will only run if loggedIn exists
// })
