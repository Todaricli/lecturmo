import { el } from '@faker-js/faker';
import { Router } from 'express';
import { User } from '../../schemas/userSchema.js';
import { Course } from '../../schemas/courseSchema.js';
import { authenticate } from '../../middleware/authMW.js';
import mongoose from 'mongoose';

const SinglePageRouters = Router();

SinglePageRouters.get('/courses/:courseId', async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId).populate({
      path: 'reviews',
      populate: {
        path: 'userId',
        select: 'username avatarPicture',
      },
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Error fetching course data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default SinglePageRouters;
