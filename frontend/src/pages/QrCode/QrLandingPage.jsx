import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import VerificationSuccess from '../ScanVerificationPage/VerificationSuccessPage.jsx';
import VerificationError from '../ScanVerificationPage/VerificationErrorPage.jsx';

const QrLandingPage = () => {
  const [params, setParams] = useSearchParams();
  const [date, setDate] = useState(undefined);
  const [course, setCourse] = useState(undefined);
  const [lecture, setLecture] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(undefined);
  const [validity, setValidity] = useState();
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState();

  const submit = async () => {
    console.log('hi');
    if (date && course) {
      console.log('asdfsadf');
      const response = await axios
        .post(
          `http://localhost:3000/api/qr-code`,
          {
            date: date,
            courseId: course,
            lecture: lecture,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          setResponse(response);
          console.log('skeet');
        });
    }
  };

  // const checkUser = async () => {
  //   const response = await axios
  //     .post(
  //       `http://localhost:3000/api/login`,
  //       {
  //         username: "user1",
  //         password: "123",
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     ).then((res) => {
  //       setLogin(true)
  //     })
  // }

  async function getStatus() {
    const response = await axios
      .get('http://localhost:3000/api/status')
      .then((res) => {
        if (res.status == 200) {
          setUser(res);
        }
      });
  }

  // useEffect(() => {
  //   getStatus()
  //   console.log(validity)

  // }, [login])

  // useEffect(() => {
  //   if (user) {
  //     console.log(user.data)
  //   }
  // }, [user])

  useEffect(() => {
    setDate(params.get('date'));
    setCourse(params.get('course'));
    setLecture(params.get('lecture'));
  }, []);

  useEffect(() => {
    console.log('asd');
    submit();
  }, [date, course]);

  useEffect(() => {
    console.log('here');
    console.log(response);
    if (response != undefined) {
      setValidity(response.data.validity);
      console.log(response.data.validity);
      setIsLoading(false);
    }
  }, [response]);

  return (
    <div>
      {isLoading ? (
        <h1>LOADING IJIOT</h1>
      ) : (
        <>{validity ? <VerificationSuccess /> : <VerificationError />}</>
      )}
    </div>
  );
};

export default QrLandingPage;
