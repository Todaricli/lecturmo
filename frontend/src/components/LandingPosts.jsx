import {
  Grid,
  Box,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardActions,
  Typography,
  Rating,
  CardContent,
} from '@mui/material';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useTheme } from '@emotion/react';

const LandingPosts = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{ marginTop: '50px', width: '400px', boxShadow: theme.shadows[1] }}
      >
        <Card variant="outlined" sx={{ borderRadius: 5 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <CardHeader title="Compsci 723" />
            <CardActions>
              <IconButton
                aria-label="favourite"
                sx={{
                  border: '3px solid #D74545',
                  padding: '5px',
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>
            </CardActions>
          </Box>
          <Box
            sx={{
              margin: '10px 10px 16px 16px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                bgcolor: 'secondary.main',
                padding: '5px',
                width: 190,
                borderRadius: 3,
              }}
            >
              <LocationOnOutlinedIcon
                fontSize="small"
                sx={{ marginRight: '5px' }}
              />
              <Typography variant="body2" color="initial">
                University of Auckland
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="initial">
                Overall:
              </Typography>
              <Rating
                name="size-small"
                defaultValue={3}
                readOnly
                size="small"
              />
            </Box>
          </Box>
          <Box>
            <CardContent>
              <Typography
                variant="subtitle2"
                color="initial"
                fontSize={15}
                sx={{ lineHeight: 3 }}
              >
                Review:
              </Typography>
              <Typography
                variant="body2"
                color="initial"
                fontSize={15}
                sx={{ lineHeight: 2 }}
              >
                Very interesting and straightfoward paper, internals (lab
                reports) were harshly marked but other than that, the
                mid-terms/exams are extremely easy to do well in. I only got 56
                and 63% respectively for my lab reports but still managed an A
                whilst only spending a day or less studying for the finals/mid
                terms. A+ is very achievable provided you put effort into your
                lab reports.
              </Typography>
              <Typography
                variant="caption"
                color="#78858F"
                sx={{ lineHeight: 3 }}
              >
                24 Feb 23:49
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </Grid>
  );
};

export default LandingPosts;
