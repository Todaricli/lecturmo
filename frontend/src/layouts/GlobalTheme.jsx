import React from "react";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    background: {
      default: "#382e7f",
    },
    primary: {
      main: "#FFF3F3",
    },
    secondary: {
      main: "#FFCF60",
    },
    light: {
      main: "#FFFFFF",
    },
    grey: {
      main: "#F3F4FF",
    },
    text: {
      primary: "#2E2E2E",
    },
  },
  shadows: {
    0: "none",
    1: "rgba(0, 0, 0, 0.15) 0px 30px 14px",
  },
});