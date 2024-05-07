import { el } from '@faker-js/faker';
import { Router } from 'express';
import { User } from '../../schemas/userSchema.js';
import { Course } from '../../schemas/courseSchema.js';
import { authenticate } from '../../middleware/authMW.js';
import mongoose from 'mongoose';

const LectureRouter = Router();

function convertToDateObject(date) {
    const [time, rubbish] = date.split('.');
    const timez = time + 'z';
    const timezOb = new Date(timez);
  
    return timezOb;
  }

LectureRouter.post('/add-lecture', async (req, res) => {
    const lectureName = req.body.lectureName
    const courseId = req.body.courseId

    const courseIdObject = new mongoose.Types.ObjectId(courseId)

    const dateNowSkeet = await fetch(
        `http://worldtimeapi.org/api/timezone/Pacific/Auckland`,
    );
    const dateNowSkeetJson = await dateNowSkeet.json()
    console.log(dateNowSkeetJson.utc_datetime)

    const lecture = {
        lectureName: lectureName,
        attendenace: 0,
        date: dateNowSkeetJson.utc_datetime,
        qrCreationTime: dateNowSkeetJson.utc_datetime

    }

    const sket = await Course.updateOne({ _id: courseIdObject }, {
        $push: { lectures: lecture }
    }).exec()

    res.send("fuck")
});

LectureRouter.get('/lecture-list', async (req, res) => {
    try {
        const user = req.user
        console.log("hi")
        console.log(user._id)

        const course = await Course.find({ lecturerId: user._id }).exec()
        console.log("skeet")
        console.log(course)

            res.json(course)
        } catch (error) {
            res.send(error)
    }

})

export default LectureRouter;
