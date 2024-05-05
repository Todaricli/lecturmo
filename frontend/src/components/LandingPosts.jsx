import {
  Grid,
  Box,
  Card,
  CardHeader,
  IconButton,
  CardActions,
  Typography,
  Rating,
  CardContent,
} from '@mui/material';
import React, { useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useTheme } from '@emotion/react';

const LandingPosts = ({ posts }) => {
  const theme = useTheme();

  useEffect(() => {
    console.log('posts:', posts);
    if (posts.length > 0) {
      console.log('posts[0]:', posts[0]);
      console.log('posts[0].reviews:', posts[0].reviews);
    }
  }, [posts]);

  return (
    <Grid
      container
      direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ mt: '20px' }}
    >
      {[...Array(2)].map((_, columnIndex) => (
        <Grid item lg={2} key={columnIndex}>
          {/* Each column */}
          {posts
            .filter((_, index) => columnIndex === index % 3)
            .map((course, index) => (
              <Box
                key={index}
                sx={{
                  marginTop: '15px',
                  width: '400px',
                  boxShadow: theme.shadows[1],
                }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 5,
                    bgcolor: index % 2 === 0 ? 'primary.main' : 'light.main',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      height: '100%',
                    }}
                  >
                    <CardHeader title={course.course_dummy_id} />
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
                    {course.reviews && course.reviews.length > 0 && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" color="initial">
                          Ratings:
                        </Typography>
                        <Rating
                          name="size-small"
                          value={course.reviews[0].contentRating}
                          readOnly
                          size="small"
                        />
                      </Box>
                    )}
                  </Box>
                  {course.reviews && course.reviews.length > 0 && (
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
                          {course.reviews[0].content}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="#78858F"
                          sx={{ lineHeight: 3 }}
                        >
                          {new Date(course.createdAt).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                    </Box>
                  )}
                </Card>
              </Box>
            ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default LandingPosts;
