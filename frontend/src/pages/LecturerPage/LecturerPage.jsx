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
  TextField,
} from '@mui/material';
import QrCode from '../QrCode/QrCode.jsx';
import AddNewLecture from '../../components/AddNewLecture.jsx';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';

const LecturerPage = () => {
  const navigate = useNavigate();
  const [coursesList, setCoursesList] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQr, setActiveQr] = useState(false);

  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const [selectedLectureName, setSelectedLectureName] = useState(null);
  const [selectedCourseId, setCourseId] = useState(null);
  const [selectedCourseName, setSelectedCourseName] =
    useState('nothing selected');
  const [courses, setCourses] = useState();
  const [courseNo, setCourseNo] = useState();
  const [lectures, setLectures] = useState();
  const [newLectureTitle, setNewLectureTitle] = useState();
  const [lectureDate, setLectureDate] = useState();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (months are zero-based) and pad with leading zero if necessary
    const year = date.getFullYear(); // Get full year

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const getClasses = async () => {
    await axios.get(`http://localhost:3000/api/lecture-list`).then((res) => {
      console.log(res);
      setCourseNo(res.data.length);
      setCourses(res.data);
      setLectures(res.data.lectures);
    });
  };

  const createLecture = async (courseId) => {
    await axios
      .post(
        `http://localhost:3000/api/add-lecture`,
        {
          lectureName: newLectureTitle,
          courseId: courseId,
          date: lectureDate,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {});
  };

  console.log(courses);

  useEffect(() => {
    setIsLoading(true);
    getClasses();
  }, []);

  useEffect(() => {
    if (coursesList != undefined) {
      console.log('fuck');
      console.log(courseList);
    }
  }, [coursesList]);

  return (
    <>
      {courses ? (
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
                Hi {'test'}
              </Typography>
              <Typography variant="body1" color="initial">
                You are teaching {courseNo} classes this semester.
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
                width: '300px',
                height: '350px',
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'center',

                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                color="initial"
                sx={{ fontWeight: 'bold' }}
              >
                {selectedCourseName}
              </Typography>

              <Typography
                variant="subtitle2"
                color="initial"
                sx={{ fontWeight: 'bold' }}
              >
                {selectedLectureName}
              </Typography>
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  window.open(
                    `http://localhost:5173/qr?lecture=${selectedLectureId}&course=${selectedCourseId}`,
                    '_blank'
                  );
                }}
                sx={{
                  bgcolor: 'background.default',
                  borderRadius: 4,
                  width: '150px',
                  '&:hover': {
                    backgroundColor: 'secondary.main',
                    color: '#000000',
                  },
                }}
              >
                create QR code
              </Button>
            </Box>

            {courses.length > 0 ? (
              courses.map((course) => (
                <Box
                  sx={{
                    bgcolor: 'primary.main',
                    width: '100%',
                    height: '400px',
                    p: '20px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                      mb: '10px',
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="initial"
                      sx={{ mb: '5px', mr: '10px' }}
                    >
                      {course.courseName}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: 'secondary.main', borderRadius: 5 }}
                    >
                      Add Lecture
                    </Button>
                  </Box>
                  <Table sx={{ maxWidth: '100%', bgcolor: 'grey.main' }}>
                    <TableHead sx={{ bgcolor: 'background.default' }}>
                      <TableRow>
                        <TableCell sx={{ color: 'light.main' }}>
                          Title
                        </TableCell>
                        <TableCell sx={{ color: 'light.main' }}>Date</TableCell>
                        <TableCell sx={{ color: 'light.main' }}>
                          Student Attendance
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {course.lectures ? (
                        course.lectures.map((lecture) => (
                          <TableRow
                            onClick={() => {
                              setSelectedLectureId(lecture._id);
                              setSelectedLectureName(lecture.lectureName);
                              setCourseId(course._id);
                              setSelectedCourseName(course.courseName);
                            }}
                          >
                            <TableCell>
                              {' '}
                              {lecture.lectureName && lecture.lectureName}
                            </TableCell>
                            <TableCell>
                              {lecture.date ? formatDate(lecture.date) : null}
                            </TableCell>
                            <TableCell>{lecture.attendence} students</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <h3>there are no lectures currently</h3>
                      )}
                    </TableBody>
                  </Table>

                  <Box>
                    <TextField
                      onChange={(e) => {
                        setNewLectureTitle(e.target.value);
                      }}
                    ></TextField>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        format="DD-MM-YYYY"
                        onChange={(e) => {
                          setLectureDate(e.$d);
                          console.log(e.$d);
                        }}
                        label="Choose lecture date"
                      />
                    </LocalizationProvider>
                    <Button
                      onClick={() => createLecture(course._id)}
                      style={{ background: 'white' }}
                    >
                      submit
                    </Button>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography style={{ color: 'white' }}>
                YOU ARE NOT CURRENTLY IN CHARGE OF ANY CLASSES
              </Typography>
            )}
          </Box>
        </Container>
      ) : null}
    </>
  );
};

// <div>
// <h1>this is lecturer page</h1>
// {coursesList && null}
// <AddNewLecture lectureId = {getLectureId} courseList={courses}/>
// <button
//   style={{ background: "white" }}
//   onClick={()=>{
//     setActiveQr(!activeQr)
//   }}
// >
//   create QR code
// </button>
// {activeQr
// ?<QrCode lecture={lectureId} course={courseId}/>
// : null}

// </div>

export default LecturerPage;
