import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  MenuItem,
  Menu,
  Grid,
} from '@mui/material';
import { useTheme } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [categorySearch, setCategorySearch] = useState([]);
  const [courseSearch, setCourseSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState();

  const navigate = useNavigate()

  const submit = async () => {
    const response = await axios
      .post(
        `http://localhost:3000/api/search`,
        {
          searchterm: searchTerm,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        setCourseSearch(response.data.courses);
        setCategorySearch(response.data.category);
        console.log(response.data);
      });
  };

  useEffect(() => {
    submit();
  }, [searchTerm]);

  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50px',
      }}
    >
      <TextField
        placeholder="Search"
        sx={{
          width: '500px',
          backgroundColor: theme.palette.light.main,
          borderRadius: 10,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
          },
        }}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Grid
        container
        flexDirection="column"
        sx={{
          bgcolor: 'light.main',
          borderRadius: 3,
          mt: '10px',
          width: '100%',
        }}
      >
        {courseSearch != undefined && categorySearch != undefined
          ? courseSearch.map((result) => {
              return (
                <Grid
                  item
                  key={result.id}
                  sx={{
                    p: '10px 10px 10px 10px ',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      cursor: 'pointer',
                      borderRadius: 3,
                    },
                  }}
                >
                  {result.courseName}
                </Grid>
              );
            })
          : null}
      </Grid>
    </Box>
  );
};

export default SearchBar;
