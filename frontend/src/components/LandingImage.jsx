import React, { useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { Box, } from '@mui/material';

export default function LandingImage() {
  return (
    <Box sx={{ height: '300px', width: '100%', position: 'relative'}}> {/* Set height and width */}
    <Spline scene="https://prod.spline.design/gPLjvSN98g764juA/scene.splinecode"/> {/* Render the Spline component */}
  </Box>
  );
}
