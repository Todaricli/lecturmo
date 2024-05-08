import React, { useEffect } from 'react';
import { Application } from '@splinetool/runtime';

const LandingImage = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas3d');
    const app = new Application(canvas);
    app.load('https://prod.spline.design/gPLjvSN98g764juA/scene.splinecode');

    // Cleanup function
    return () => {
      app.destroy(); // Ensure cleanup to avoid memory leaks
    };
  }, []);

  return <canvas id="canvas3d" />;
};

export default LandingImage;
