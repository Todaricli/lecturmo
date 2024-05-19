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
  Stack,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import QrCode from '../QrCode/QrCode.jsx';
import AddNewLecture from '../../components/AddNewLecture.jsx';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider.jsx';
import Loading from '../../components/Loading.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClearIcon from '@mui/icons-material/Clear';
import AccessDenied from '../../components/AccessDenied.jsx';
import { preloadImages } from '../../services/preloadImages.js';

const BASE_URL =
  import.meta.env.VITE_BACKEND_EXPRESS_APP_ENDPOINT_API_URL ??
  'http://localhost:3000/api';

const FRONTEND_HOST_URL =
  import.meta.env.VITE_FRONTEND_NETLIFY_APP_URL ??
  'http://localhost:5173';

const LecturerPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [initialLoad, setInitialLoad] = useState(true);
  const [coursesList, setCoursesList] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const [selectedLectureName, setSelectedLectureName] = useState(null);
  const [selectedCourseId, setCourseId] = useState(null);
  const [selectedCourseCode, setSelectedCourseCode] = useState('nothing selected');
  const [courses, setCourses] = useState();
  const [courseNo, setCourseNo] = useState();
  const [lectures, setLectures] = useState();
  const [newLectureTitle, setNewLectureTitle] = useState();
  const [lectureDate, setLectureDate] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [createLectureCourse, setCreateLectureCourse] = useState();
  const [changeSort, setChangeSort] = useState('dateDesc');

  useEffect(() => {
    // Redirect if the user is not a lecturer
    if (user?.roles !== 'lecturer') {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const preloadAvatarAndFetchClasses = async () => {
      try {
        if (user?.avatarPicture) {
          await preloadImages([user.avatarPicture]);
        }
        const response = await axios.get(`${BASE_URL}/lecture-list`);
        setCourseNo(response.data.length);
        setCourses(response.data);
        setLectures(response.data.lectures);
      } catch (error) {
        console.error('Failed to preload avatar or fetch classes:', error);
      } finally {
        setInitialLoad(false);
      }
    };

    if (user) {
      preloadAvatarAndFetchClasses();
    } else {
      setInitialLoad(false);
    }
  }, [user]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/lecture-list`);
        setCourseNo(response.data.length);
        setCourses(response.data);
        setLectures(response.data.lectures);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    if (!initialLoad) {
      fetchCourses();
    }
  }, [isLoading, initialLoad]);

  const sortLecturesByNameDesc = () => {
    const sortedCourses = courses.map((course) => {
      const sortedLectures = [...course.lectures].sort((a, b) => {
        const lectureNameA = a.lectureName.toLowerCase();
        const lectureNameB = b.lectureName.toLowerCase();
        return lectureNameA.localeCompare(lectureNameB);
      });
      return { ...course, lectures: sortedLectures };
    });
    setCourses(sortedCourses);
  };

  const sortLecturesByNameAsc = () => {
    const sortedCourses = courses.map((course) => {
      const sortedLectures = [...course.lectures].sort((a, b) => {
        const lectureNameA = a.lectureName.toLowerCase();
        const lectureNameB = b.lectureName.toLowerCase();
        return lectureNameB.localeCompare(lectureNameA);
      });
      return { ...course, lectures: sortedLectures };
    });
    setCourses(sortedCourses);
  };

  const sortLecturesByDateAsc = () => {
    const sortedCourses = courses.map((course) => {
      const sortedLectures = [...course.lectures].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      return { ...course, lectures: sortedLectures };
    });
    setCourses(sortedCourses);
  };

  const sortLecturesByDateDesc = () => {
    const sortedCourses = courses.map((course) => {
      const sortedLectures = [...course.lectures].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      return { ...course, lectures: sortedLectures };
    });
    setCourses(sortedCourses);
  };

  const sortList = (sortStyle) => {
    if (courses !== undefined) {
      if (sortStyle === 'dateAsc') {
        sortLecturesByDateAsc();
      } else if (sortStyle === 'dateDesc') {
        sortLecturesByDateDesc();
      } else if (sortStyle === 'titleAsc') {
        sortLecturesByNameAsc();
      } else if (sortStyle === 'titleDesc') {
        sortLecturesByNameDesc();
      }
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const deleteLecture = async (lectureIdToDelete, courseIdToDelete) => {
    const response = await axios.post(
      `${BASE_URL}/delete-lecture`,
      { courseId: courseIdToDelete, lectureId: lectureIdToDelete },
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response.data.success) {
      toast.success('Lecture successfully deleted');
      setCourseId(null);
      setSelectedLectureName(null);
      setSelectedLectureId(null);
      setSelectedCourseCode('nothing selected');
    } else {
      toast.error('Error deleting lecture');
    }
    setIsLoading(!isLoading);
  };

  const createLecture = async (courseId) => {
    await axios.post(
      `${BASE_URL}/add-lecture`,
      {
        lectureName: newLectureTitle,
        courseId: courseId,
        date: lectureDate,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    setIsLoading(!isLoading);
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
  };

  useEffect(() => {
    sortList(changeSort);
  }, [changeSort]);

  if (initialLoad || user === null) {
    return <Loading />;
  }

  return (
    <>
      {initialLoad ? (
        <Loading />
      ) : user === null || user.roles != 'lecturer' ? (
        <AccessDenied />
      ) : courses ? (
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
              sx={{ width: 180, height: 200, borderRadius: 4 }}
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
                {selectedCourseCode}
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
                    `${FRONTEND_HOST_URL}/qr?lecture=${selectedLectureId}&course=${selectedCourseId}&courseCode=${encodeURI(selectedCourseCode)}`,
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
                disabled={
                  selectedLectureId === null || selectedCourseId === null
                    ? true
                    : false
                }
              >
                Create QR code
              </Button>
            </Box>
            <Box bgcolor="primary.main" width="100vw" pr="5px">
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={1}
                mt={2}
              >
                <Typography variant="subtitle2" color="initial">
                  Sort:
                </Typography>
                <FormControl sx={{ width: '200px' }}>
                  <Select
                    labelId="post-select"
                    id="post-select"
                    value={changeSort}
                    onChange={(e) => {
                      setChangeSort(e.target.value);
                    }}
                    sx={{
                      borderRadius: 5,
                      bgcolor: 'light.main',
                      height: '35px',
                    }}
                  >
                    <MenuItem value={'dateDesc'}>Latest</MenuItem>
                    <MenuItem value={'dateAsc'}>Oldest</MenuItem>
                    <MenuItem value={'titleAsc'}>Title Ascending</MenuItem>
                    <MenuItem value={'titleDesc'}>Title Descending</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
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
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: '10px',
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="initial"
                      sx={{ mb: '5px', mr: '10px' }}
                    >
                      {course.courseCode}-{course.courseName}
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
                            key={lecture._id}
                            sx={
                              lecture._id == selectedLectureId
                                ? {
                                  backgroundColor: 'yellow',
                                  cursor: 'pointer',
                                }
                                : { cursor: 'pointer' }
                            }
                            onClick={() => {
                              setSelectedLectureId(lecture._id);
                              setSelectedLectureName(lecture.lectureName);
                              setCourseId(course._id);
                              setSelectedCourseCode(course.courseCode);
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
                              <IconButton
                                onClick={() => {
                                  deleteLecture(lecture._id, course._id);
                                }}
                              >
                                <ClearIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <Typography variant="h6">
                          there are no lectures currently
                        </Typography>
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
                      mx: "10px",

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
                        p: "50px 10px",
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
              <Typography variant="h6">
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
