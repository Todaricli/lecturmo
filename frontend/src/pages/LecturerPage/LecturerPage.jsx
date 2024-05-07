import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Modal,
  Typography,
  Button,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TextField,
  IconButton,
} from '@mui/material';
import QrCode from '../QrCode/QrCode.jsx';
import AddNewLecture from '../../components/AddNewLecture.jsx';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContextProvider.jsx'
import Loading from '../../components/Loading.jsx';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ClearIcon from '@mui/icons-material/Clear';

const LecturerPage = () => {
  const { user } = useContext(AuthContext);
  if (user === null) {
    return <Loading />;
  }
  
  useEffect(()=>{
    console.log("user:", user)
  }, [user])

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
  const [openModal, setOpenModal] = useState(false)
  const [createLectureCourse, setCreateLectureCourse] = useState()

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

  const handleSubmitLecture = async (courseId) => {
    try {
      await createLecture(courseId);
      toast.success('Lecture added successfully!');
      setOpenModal(false);
    } catch (error) {
      console.error('Failed to add lecture:', error);
      toast.error('Failed to add lecture. Please try again.');
    }
  }

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
          <Box
            sx={{
              bgcolor: 'primary.main',
              height: '250px',
              width: '100vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={user.avatarPicture}
              sx={{ width: 180, height: '200px', borderRadius: 4 }}
            />
            <Box ml="10px">
              <Typography variant="h6" color="initial">
                Hi, {user.fname} {user.lname}
              </Typography>
              <Typography variant="body1" color="initial">
                You are teaching{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {courseNo} {courseNo <= 1 ? 'class' : 'classes'} {''}
                </span>
                at the moment.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: 'secondary.main',
              height: '100%',
              width: '100vw',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                bgcolor: 'light.main',
                maxWidth: '100%',
                height: '200px',
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                m: 2,
                p: 2,
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
                Create QR code
              </Button>
            </Box>

            {courses.length > 0 ? (
              courses.map((course) => (
                <Box
                  sx={{
                    bgcolor: 'primary.main',
                    width: '100%',
                    height: '100%',
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
                      onClick={() => {
                        setOpenModal(true);
                        setCreateLectureCourse(course._id);
                      }}
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
                        <TableCell sx={{ color: 'light.main' }}>
                          Delete
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
                            <TableCell>
                              <IconButton>
                                <ClearIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <Typography variant="h6">there are no lectures currently</Typography>
                      )}
                    </TableBody>
                  </Table>

                  <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100vh',
                    }}
                    slotProps={{
                      backdrop: {
                        style: { backgroundColor: 'rgba(128, 128, 128, 0.3)' },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: 'secondary.main',
                        p: 10,
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 5,
                      }}
                    >
                      <TextField
                        onChange={(e) => {
                          setNewLectureTitle(e.target.value);
                        }}
                        sx={{ bgcolor: 'light.main' }}
                      ></TextField>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          format="DD-MM-YYYY"
                          onChange={(e) => {
                            setLectureDate(e.$d);
                            console.log(e.$d);
                          }}
                          label="Choose lecture date"
                          sx={{ bgcolor: 'light.main' }}
                        />
                      </LocalizationProvider>
                      <Button
                        onClick={() => {
                          handleSubmitLecture(createLectureCourse);
                        }}
                        sx={{
                          bgcolor: 'background.default',
                          ml: '10px',
                          borderRadius: 5,
                          '&:hover': {
                            backgroundColor: 'lightBlue.main',
                          },
                        }}
                        disabled={
                          newLectureTitle === undefined ||
                          lectureDate === undefined
                        }
                      >
                        Submit
                      </Button>
                    </Box>
                  </Modal>
                </Box>
              ))
            ) : (
              <Typography variant='h6'>
                YOU ARE NOT CURRENTLY IN CHARGE OF ANY CLASSES
              </Typography>
            )}
          </Box>
        </Container>
      ) : null}
    </>
  );
};


export default LecturerPage;
