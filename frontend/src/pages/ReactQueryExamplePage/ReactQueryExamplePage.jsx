import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'Axios'

// NEED TO ADJUST CORS POLICY HERE TO ALLOW CREDENTIALS
axios.defaults.withCredentials = true;

const defaultTheme = createTheme();

const ReactQueryExamplePage = () => {

  // fetch example with outside api CANNOT USE BECAUSE CANNOT ADJUST THE CORS POLICY HERE, if you want to test, comment out the axios.defaults above
  const { isPending: idPendingDog, isError: isErrDog, data: dogData, error: dogError } = useQuery({
    queryKey: ['dog'],
    queryFn: async () => {
      // const res = await axios.get("https://dog.ceo/api/breeds/image/random")
      // return res.data
      return 1
    }
  })




  // login example, with fetch status dependant on the current user

  const { status: loginStatus, data: loginRes, refetch: postLogin } = useQuery({
    queryKey: ['postLogin'],
    queryFn: async () => {
      const res = await axios.post('http://localhost:3000/api/login', {
        username: 'user2',
        password: '123'
      });
      return res.data
    },
    enabled: false, // Initially, the query is disabled
  })

  const loggedIn = loginRes?.message

  const { data: userInfo } = useQuery({
    queryKey: ['getLoginUser'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/status');
      console.log("res:", res)
      return res.data
    },
    enabled: !!loggedIn, // will only run if loggedIn exists
  })

  const handleLogin = async () => {
    await postLogin() // refetches the postLogin here
    console.log("loginStatus:", loginStatus)
  }


  // dog loading and error messages
  if (idPendingDog) {
    return <span className='font-bold text-3xl'>Loading...</span>
  }

  if (isErrDog) {
    console.log("isErrDog:", isErrDog)
    return <span className='font-bold text-3xl'>Error: {dogError.message}</span>
  }

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

          {idPendingDog && <p>Data is Loading</p>}
          {dogData && <img src={dogData.message} alt="dog picture" />}

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

        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default ReactQueryExamplePage