import React from 'react';
import { Container, Box, Typography, LinearProgress } from '@mui/material';

const StatsPage = () => {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 10,
        }}
      >
        <Typography variant="h3" color="light.main" sx={{ mb: 5 }}>
          Your Stats
        </Typography>
        <Box
          sx={{
            bgcolor: 'primary.main',
            height: '300px',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              bgcolor: 'light.main',
              width: '200px',
              height: '200px',
              borderRadius: 10,
              mr: 5,
            }}
          >
            <Typography variant="body1" color="initial" sx={{ p: 3 }}>
              Beginner
            </Typography>
          </Box>
          <Typography variant="body1" color="initial">
            You have 0 point. Earn extra 20 points to unlock silver!
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: 'secondary.main',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            color="background.default"
            sx={{ fontWeight: 'bold', mt: 5, mb: 3 }}
          >
            Classes Taking
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              //   justifyContent: "center",
              alignItems: 'center',
              width: '80%',
              height: '150px',
              bgcolor: 'light.main',
              borderRadius: 4,
            }}
          >
            <Box
              sx={{
                p: '30px',
                pb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography
                variant="h5"
                color="initial"
                sx={{ fontWeight: 'bold' }}
              >
                Compsci 732
              </Typography>
              <Typography variant="body2" color="#78858F">
                20/50 Classes
              </Typography>
            </Box>
            <Box sx={{ width: '100%', p: '0 30px' }}>
              <LinearProgress variant="determinate" value={50} />
            </Box>

            <Typography
              variant="h6"
              color="#000200"
              sx={{
                fontSize: 18,
                fontStyle: 'italic',
                ml: 'auto',
                p: '10px 30px',
              }}
            >
              Semester 2 - 2024
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default StatsPage;
