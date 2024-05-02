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
import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useTheme } from '@emotion/react';


const LandingPosts = ({posts}) => {
  const theme = useTheme();
  


  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      
      {posts.map((post, index) => (
    <Box
        key={index}
        sx={{ marginTop: '50px', width: '400px', boxShadow: theme.shadows[1]}}
      >
        <Card variant="outlined" sx={{ borderRadius: 5, bgcolor: index % 2 === 0 ? "primary.main" : "light.main" }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <CardHeader title={post.courseNumber} />
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
                Ratings:
              </Typography>
              <Rating
                name="size-small"
                value={post.reviews[0].rating}
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
               {post.reviews[0].content}
              </Typography>
              
              <Typography
                variant="caption"
                color="#78858F"
                sx={{ lineHeight: 3 }}
              >
                {new Date(post.updatedAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Box>
      ))}
      
    </Grid>
  );
};

export default LandingPosts;
