import * as dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
import express from 'express';
import { Course } from '../../schemas/courseSchema.js';

const router = express.Router();
const API_KEY = process.env.OPEN_AI_API_KEY ?? '';
const ORG_ID = process.env.ORG_ID ?? '';
const PROJ_ID = process.env.PROJ_ID ?? '';

export const openai = new OpenAI({
  apiKey: API_KEY,
  organization: ORG_ID,
  project: PROJ_ID,
});

router.get('/summarizeReview', async (req, res) => {
  const courseDummyId = req.body.courseId;

  if (!courseDummyId)
    return res
      .status(400)
      .json('Please provided a course you want to get summary');

  try {
    const course = await Course.findOne({ course_dummy_id: courseDummyId });

    if (!course)
      return res.status(500).json('Unable to retrieve course reviews data');

    const courseName = JSON.stringify(
      course.course_dummy_id + ': ' + course.courseName,
    );
    const reviewArray = JSON.stringify(course.reviews);

    if (!reviewArray)
      return res.status(400).json('This course has no review yet!');

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Please act like a geniue course advisor summarize the reviews into only 50 words paragraph for course ${courseName} provided below in plain languages: ${reviewArray} for prospective students who might want to take the course and provide a rating 1 out of 5`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    if (!completion)
      return res
        .status(500)
        .json('Unable to generate summary, please try again in 10 minutes!');

    return res.status(200).json(completion.choices[0].message.content);
  } catch (e) {
    console.log(e.messages);
    return res.status(500).json(e.messages);
  }
});

export default router;
