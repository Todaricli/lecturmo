import React from "react";
import {
  Box,
  Card,
  Container,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Avatar, IconButton
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const EditProfilePage = () => {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: "secondary.main",
          marginTop: 80,
          height: "100vh",
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          zIndex: -999999,
          position: "relative",
        }}
      ></Box>
      <Container
        sx={{
          bgcolor: "primary.main",
          zIndex: 10,
          position: "absolute",
          top: 200,
          width: 600,
          height: 1100,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box>
          <IconButton color="initial" component={Link} to="/profile">
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Avatar
              alt="avatar"
              src="/assets/dog.jpg"
              sx={{ width: 150, height: 150 }}
            />
            <IconButton
              aria-label="edit avatar"
              sx={{
                position: "absolute",
                left: "330px",
                top: "190px",
                bgcolor: "light.main",
              }}
            >
              <CameraAltIcon />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ marginTop: 10 }}>
          <Typography variant="h6" color="text.primary">
            Name
          </Typography>
          <TextField sx={{ width: "100%" }} variant="filled" />
        </Box>
        <Box sx={{ marginTop: 5 }}>
          <Typography variant="h6" color="text.primary">
            Gender
          </Typography>
          <FormControl sx={{ width: 200 }} variant="filled">
            <Select
              labelId="gender-label"
              id="gender"
              label="Gender"
              defaultValue=""
              sx={{ zIndex: "100" }}
            >
              <MenuItem>Female</MenuItem>
              <MenuItem>Male</MenuItem>
              <MenuItem>Non-Binary</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ marginTop: 5 }}>
          <Typography variant="h6" color="initial">
            Day of Birth
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Basic date picker" />
          </LocalizationProvider>
        </Box>

        <Box sx={{ marginTop: 5 }}>
          <Typography variant="h6" color="initial">
            Description
          </Typography>
          <TextField
            multiline
            rows={10}
            sx={{ width: "100%" }}
            variant="filled"
          />
        </Box>

        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: 5, borderRadius: 4 }}
        >
          Submit
        </Button>
      </Container>
    </Box>
  );
};

export default EditProfilePage;
