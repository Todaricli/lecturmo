import { el } from '@faker-js/faker';
import { Router } from 'express';
import { User } from '../../schemas/userSchema.js';
import { Course } from '../../schemas/courseSchema.js';
import { authenticate } from '../../middleware/authMW.js';
import mongoose from 'mongoose';

const QrRouters = Router();

function convertToDateObject(date) {
  const [time, rubbish] = date.split('.');
  const timez = time + 'z';
  const timezOb = new Date(timez);

  return timezOb;
}

QrRouters.post('/qr-code', async (req, res) => {
  const date = req.body.date;
  const courseId = req.body.courseId;
  const userId = req.body.userId;

  const dateNowSkeet = await fetch(
    `http://worldtimeapi.org/api/timezone/Pacific/Auckland`,
  );
  const dateNowJson = await dateNowSkeet.json();
  const dateNow = dateNowJson.utc_datetime;

  const dateObject = convertToDateObject(date);
  const dateNowObject = convertToDateObject(dateNow);

  const user = await User.find({ username: 'user4' });

  console.log(dateObject);
  console.log(dateNowObject);
  console.log(userId);
  console.log(user[0].courses);

  const difference = (dateNowObject - dateObject) / 1000;
  const usernameIdObject = new mongoose.Types.ObjectId(username._id);

  if (date == undefined || courseId == undefined) {
    res.send('yagotproblems');
    return;
  }

  try {
    console.log('skeet');
    const sket = await User.updateOne(
      {
        _id: usernameIdObject,
        courses: { $elemMatch: { 'course.id': courseId } },
      },
      { $push: { 'courses.$.lectures': 576 } },
    ).exec();
    console.log(sket);
  } catch (error) {
    console.log(error);
  }

  //---------------------------set expiry time here skeet ------------------------------------
  if (difference < 30) {
    res.json({
      date: dateObject,
      dateNow: dateNowObject,
      difference: difference,
      validity: true,
      skeets: 'in joy',
    });
    return;
  } else {
    res.json({
      date: dateObject,
      dateNow: dateNowObject,
      difference: difference,
      validity: false,
      skeets: 'in anger',
    });
    return;
  }
});

export default QrRouters;
