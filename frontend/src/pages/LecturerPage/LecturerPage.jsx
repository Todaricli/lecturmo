import React, { useEffect, useState } from 'react';
import axios from 'Axios';

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
    <div>
      <h1>this is lecturer page</h1>
      {coursesList && { coursesList }}
    </div>
  );
};

export default LecturerPage;
