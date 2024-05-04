import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';

const LecturerPage = () => {
  const [coursesList, setCoursesList] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/api/lecturer-page/`)
      .then((list) => {
        setCoursesList(list.data);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (coursesList != undefined) {
    }
  }, [coursesList]);

  // const courseElement =() => {
  //     coursesList.map((course) => {
  //         <div>
  //             <p>{course.courseName}</p>
  //             <p>{course._id}</p>
  //             <p>{course.level}</p>
  //         </div>
  //     })
  // }

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 10,
      }}
    >
      <Card
        sx={{
          bgcolor: 'primary.main',
          height: '250px',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardMedia
          title="lecturer img"
          image="/assets/dog.jpg"
          component="img"
          sx={{ width: 180, height: '200px', borderRadius: 4 }}
        />
        <CardContent>
          <Typography variant="h6" color="initial">
            Hi Lecturer Sheldon
          </Typography>
          <Typography variant="body1" color="initial">
            You are teaching 5 classes this semester.
          </Typography>
        </CardContent>
      </Card>
      <Box
        sx={{
          bgcolor: 'secondary.main',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          color="background.default"
          sx={{ fontWeight: 'bold', mt: 5, mb: 3 }}
        >
          Classes Taking
        </Typography>
        <Box
          sx={{
            bgcolor: 'light.main',
            width: '200px',
            height: '150px',
            borderRadius: 5,
            display: 'flex',
            justifyContent: 'center',
            p: '10px',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Typography variant="h5" color="initial" sx={{ fontWeight: 'bold' }}>
            Compsci 732
          </Typography>
          <Typography
            variant="body2"
            color="initial"
            sx={{ fontWeight: 'bold' }}
          >
            Semester 2 - 2024
          </Typography>
          <Button
            variant="text"
            color="primary"
            sx={{
              bgcolor: 'background.default',
              borderRadius: 4,
              width: '100px',
              '&:hover': {
                backgroundColor: 'secondary.main',
                color: '#000000',
              },
            }}
          >
            QR code
          </Button>
        </Box>
        <Typography
          variant="h4"
          color="background.default"
          sx={{ fontWeight: 'bold', mt: 5, mb: 3 }}
        >
          Student Attendance
        </Typography>
        <Box
          sx={{
            bgcolor: 'primary.main',
            width: '100%',
            height: '400px',
            p: '20px',
          }}
        >
          <Typography variant="h6" color="initial" sx={{ mb: '5px' }}>
            Compsci 732
          </Typography>
          <Table sx={{ maxWidth: '100%', bgcolor: 'grey.main' }}>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell sx={{ color: 'light.main' }}>Title</TableCell>
                <TableCell sx={{ color: 'light.main' }}>Date</TableCell>
                <TableCell sx={{ color: 'light.main' }}>
                  Student Attendance
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Introduction to React</TableCell>
                <TableCell>Tue 24 May</TableCell>
                <TableCell>20/100 students</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Container>
  );
};

export default LecturerPage;
