import {
  Container,
  Box,
  Typography,
  Divider,
  Rating,
  Stack,
  Grid,
  Button,
  MenuItem,
  Select,
  FormControl,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import React from 'react';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



const SinglePostPage = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          bgcolor: 'light.main',
          height: '100%',
          p: '20px',
          borderRadius: 5,
          mt: 5,
        }}
      >
        <Typography variant="h4" color="initial">
          Compsci 732
        </Typography>
        <Typography variant="subtitle1" color="initial">
          Software Tools and Technique
        </Typography>
        <Divider sx={{ borderBottomWidth: 3 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: '20px',
            mb: '20px',
          }}
        >
          <Box
            width={{ xs: '100%', md: 'calc(80% - 10px)' }}
            mr={{ xs: '10px', md: '20px' }}
          >
            <Typography variant="body2" color="initial" align="justify">
              State-of-the-art software development, particularly in teams,
              requires the use of advanced tools to deliver high-quality
              software across the many platforms that we encounter today. It is
              characterized by a wide variety of techniques ranging from formal
              to informal, from automated to manual operations and covering
              programs as well as data. In industry, there is an increasing
              demand to apply recent research to software development tools.
              This course has a lecture component and a group project component
              which work together to give a broad picture of current software
              development and data management tool research. The group projects
              are often exploring a novel take on interesting problems and offer
              both an authentic application of software development practices
              and an opportunity to deliver an exciting result.
            </Typography>
          </Box>

          <Grid>
            <Grid container direction={{ xs: 'column', sm: 'row', md: 'row' }}>
              <Grid item alignItems="center">
                <Typography
                  variant="body2"
                  color="initial"
                  sx={{
                    fontWeight: 'bold',
                    mr: '5px',
                  }}
                >
                  Overall:
                </Typography>
              </Grid>
              <Grid item>
                <Rating size="small" defaultValue={3} readOnly />
              </Grid>
            </Grid>
            <Grid container direction={{ xs: 'column', sm: 'row', md: 'row' }}>
              <Grid item alignItems="center">
                <Typography variant="body2" color="initial" mr="5px">
                  Difficulty:
                </Typography>
              </Grid>
              <Grid item>
                <Rating size="small" defaultValue={3} readOnly />
              </Grid>
            </Grid>
            <Grid container direction={{ xs: 'column', sm: 'row', md: 'row' }}>
              <Grid item alignItems="center">
                <Typography variant="body2" color="initial" mr="5px">
                  Content:
                </Typography>
              </Grid>
              <Grid item>
                <Rating size="small" defaultValue={3} readOnly />
              </Grid>
            </Grid>
            <Grid container direction={{ xs: 'column', sm: 'row', md: 'row' }}>
              <Grid item alignItems="center">
                <Typography variant="body2" color="initial" mr="5px">
                  Quality:
                </Typography>
              </Grid>
              <Grid item>
                <Rating size="small" defaultValue={3} readOnly />
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            sx={{ border: '2px solid grey', borderRadius: 4, color: '#000000' }}
          >
            Write a Review
            <RateReviewIcon color="icon" sx={{ height: '20px' }} />
          </Button>
          <Box
            sx={{
              display: 'flex',
              bgcolor: 'secondary.main',
              padding: '8px',
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
        </Box>
      </Box>

      <Box
        mt={5}
        sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6" color="light.main">
            Sort:
          </Typography>
          <FormControl sx={{ width: 250 }}>
            <Select
              labelId="post-select"
              id="post-select"
              defaultValue={10}
              sx={{ borderRadius: 5, bgcolor: 'light.main', height: '40px' }}
              // MenuProps={{
              //   PaperProps: {
              //     sx: {
              //       borderRadius: 5,
              //       mt: 1,
              //     },
              //     "& .MuiMenuItem-root:hover": {
              //       bgcolor: "red",
              //     },
              //   },
              // }}
            >
              <MenuItem value={10}>Most Relevant</MenuItem>
              <MenuItem value={20}>Newest</MenuItem>
              <MenuItem value={30}>Highest Rating</MenuItem>
              <MenuItem value={40}>Lowest Rating</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <Grid mt={5} sx={{ width: '80%' }}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent sx={{ p: '20px' }}>
            <Typography variant="body1" color="initial">
              Very interesting and straightfoward paper, internals (lab reports)
              were harshly marked but other than that, the mid-terms/exams are
              extremely easy to do well in. I only got 56 and 63% respectively
              for my lab reports but still managed an A whilst only spending a
              day or less studying for the finals/mid terms. A+ is very
              achievable provided you put effort into your lab reports.
            </Typography>
            <Grid container justifyContent="space-between" mt={2}>
              <Grid item>
                <Stack direction="row">
                  <Typography variant="body1" color="initial">
                    Overall:
                  </Typography>
                  <Rating size="small" defaultValue={3} />
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction="row">
                  <Typography variant="body1" color="initial">
                    Difficulty:
                  </Typography>
                  <Rating size="small" defaultValue={3} />
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction="row">
                  <Typography variant="body1" color="initial">
                    Content:
                  </Typography>
                  <Rating size="small" defaultValue={3} />
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction="row">
                  <Typography variant="body1" color="initial">
                    Quality:
                  </Typography>
                  <Rating size="small" defaultValue={3} />
                </Stack>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt:'15px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ mr: '15px' }} />
                <Box>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Sardo
                  </Typography>
                  <Typography variant="caption" color="initial">
                    24 Feb 2024
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FavoriteBorderIcon sx={{color: "heart.main"}}/>
                  <Typography variant="body1" color="initial">
                    10
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default SinglePostPage;
