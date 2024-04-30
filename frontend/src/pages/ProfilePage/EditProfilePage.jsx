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
  Button
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ marginTop: 10 }}>
          <Typography variant="h6" color="text.primary">
            Name
          </Typography>
          <TextField sx={{ width: "100%" }} />
        </Box>
        <Box sx={{ marginTop: 5 }}>
          <Typography variant="h6" color="text.primary">
            Gender
          </Typography>
          <FormControl sx={{ width: 200 }}>
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
          <TextField multiline rows={10} sx={{ width: "100%" }} />
        </Box>

        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: 5, borderRadius: 4}}
        >
          Submit
        </Button>
      </Container>
    </Box>
  );
};

export default EditProfilePage;
