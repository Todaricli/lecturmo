import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

const QrCode = () => {
  const [qrCode, setQrCode] = useState('');
  const [courseId, setCourseId] = useState('comp_sci_751');
  const [currentTime, setCurrentTime] = useState('');

  const getServerTime = async () => {
    const time = await fetch(
      `http://worldtimeapi.org/api/timezone/Pacific/Auckland`
    );
    const timeJson = await time.json();
    setCurrentTime(timeJson.utc_datetime);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getServerTime();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setQrCode(
      `http://localhost:5173/qr-landing-page?date=${currentTime}&course=${courseId}`
    );
  }, [currentTime]);

  useEffect(() => {
    console.log(qrCode);
  }, [qrCode]);

  return (
    <div>
      <h1>asdasdsad</h1>
      <QRCode value={qrCode} />
      <p>{currentTime}</p>
    </div>
  );
};

export default QrCode;
