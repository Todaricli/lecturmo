import { el } from '@faker-js/faker';
import { Router } from 'express';
import { User } from '../../schemas/userSchema.js';
import { Course } from '../../schemas/courseSchema.js';
import { authenticate } from '../../middleware/authMW.js';
import mongoose from 'mongoose';

const SearchRouter = Router();

SearchRouter.post('/search', async (req, res) => {
  const searchParams = req.body.searchterm;
  console.log(searchParams);

  if (searchParams !== undefined && searchParams.length != 0) {
    const courseSearchResults = await Course.find({
      courseName: { $regex: searchParams, $options: 'i' },
    }).exec();
    const categorySearchResults = await Course.find({
      category: { $regex: searchParams, $options: 'i' },
    }).exec();

    console.log(categorySearchResults);
    return res.json({
      courses: courseSearchResults,
      category: categorySearchResults,
    });
  }

  return res.json();
});

export default SearchRouter;
