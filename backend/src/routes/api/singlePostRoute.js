import { el } from '@faker-js/faker';
import { Router } from 'express';
import { User } from '../../schemas/userSchema.js';
import { Course } from '../../schemas/courseSchema.js';
import { authenticate } from '../../middleware/authMW.js';
import mongoose from 'mongoose';

const SinglePageRouters = Router();

SinglePageRouters.post('/single-page', async (req, res) => {
  const courseId = '663724f42816e5b79db854a2';

  const course = await Course.find({ _id: courseId }).populate({
    path: 'reviews',
    populate: {
      path: 'userId',
      select: 'name avatarPicture',
    },
  });

  if (!course) {
    return res.json({ error: 'Course not found' });
  }

  res.send(course);
});

export default SinglePageRouters;
