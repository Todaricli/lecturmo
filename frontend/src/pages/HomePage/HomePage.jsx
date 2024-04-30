import React from "react";
import Typography from "@mui/material/Typography";
import SearchBar from "../../components/SearchBar"
import LandingPosts from "../../components/LandingPosts";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Footer from "../../components/Footer";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

const HomePage = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h1">Hello Lectermo</Typography>
      <SearchBar />
      <LandingPosts />
      <ArrowDownwardIcon
        sx={{
          bgcolor: theme.palette.secondary.main,
          fontSize: 50,
          borderRadius: 10,
          padding: "5px",
          marginTop: "70px",
          textAlign: "center",
          boxShadow: theme.shadows[1],
        }}
      />
      <Footer />
    </Box>
  );
};

export default HomePage;
