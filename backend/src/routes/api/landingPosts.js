import { Router } from 'express';

import { Course } from '../../schemas/courseSchema.js';

const landingPosts = Router();

landingPosts.get('/landing-posts', async (req, res) => {
  console.log('skeet');
  try {
    const courses = await Course.find({});

    //   console.log(courses);

    res.send(courses);
  } catch (error) {
    console.error('Error fetching courses: ', error);

    res.status(500).send('Internal server error');
  }
});

export default landingPosts;
