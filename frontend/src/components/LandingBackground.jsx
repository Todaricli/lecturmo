import React, { useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { Box, } from '@mui/material';

export default function LandingBackground() {
  return (
    <Box sx={{ position: 'absolute' , height: '500px', width: '100%'}}>
    <Spline scene="https://prod.spline.design/D8zRFje228mJq-bR/scene.splinecode" />
  </Box>
  );
}
