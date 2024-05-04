import React, { useEffect, useState } from 'react';
import QrCode from "../QrCode/QrCode.jsx"
import AddNewLecture from '../../components/AddNewLecture.jsx';
import axios from 'axios';

const LecturerPage = () => {
  const [coursesList, setCoursesList] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQr, setActiveQr] = useState(false)
  const [lectureId, setLectureId] = useState(null)
  const [courseId, setCourseId] = useState(null)
  const [courses, setCourses] = useState()

  const getLectureId = (lectureId, courseId) =>{
    setLectureId(lectureId)
    setCourseId(courseId)
  }

  const getClasses = async () => {
    console.log("asd")
    await axios.get(`http://localhost:3000/api/lecture-list`)
        .then((res) => {
            console.log(res.data)
            setCourses(res.data)
        })
}

  useEffect(() => {
    setIsLoading(true);
    // axios
    //   .get(`http://localhost:3000/api/lecture-list/`)
    //   .then((list) => {
    //     console.log(list.data)
    //     setCoursesList(list.data);
    //   })
    //   .then(() => {
    //     setIsLoading(false);
    //   });
    getClasses()
  }, []);

  useEffect(() => {
    if (coursesList != undefined) {
    }
  }, [coursesList]);

  const courseElement = () => {
    coursesList.map((course) => {
      <div>
        <p>{course.courseName}</p>
        <p>{course._id}</p>
        <p>{course.level}</p>
      </div>
    })
  }

  return (
    <div>
      <h1>this is lecturer page</h1>
      {coursesList && null}
      <AddNewLecture lectureId = {getLectureId} courseList={courses}/>
      <button
        style={{ background: "white" }}
        onClick={()=>{
          setActiveQr(!activeQr)
        }}
      >
        create QR code
      </button>
      {activeQr
      ?<QrCode lecture={lectureId} course={courseId}/>
      : null}
      
    </div>
  );
};

export default LecturerPage;
