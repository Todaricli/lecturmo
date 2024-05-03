import { Router } from 'express';
import { Course } from '../../schemas/courseSchema.js';

const landingPosts = Router();

landingPosts.get('/landing-posts', async (req, res) => {
  try {
    const courses = await Course.aggregate([
      {
        $addFields: {
          reviewsWithMaxLikes: {
            $filter: {
              input: '$reviews',
              as: 'review',
              cond: {
                $eq: [
                  { $size: '$$review.likes' },
                  {
                    $max: {
                      $map: {
                        input: '$reviews',
                        as: 'review',
                        in: { $size: '$$review.likes' },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          reviewsWithMaxLikesSorted: {
            $slice: ['$reviewsWithMaxLikes', 1], // Sort the filtered reviews by likes
          },
        },
      },
      {
        $project: {
          _id: 1,
          courseNumber: 1,
          updatedAt: 1,
          highestRatedReview: {
            $arrayElemAt: ['$reviewsWithMaxLikesSorted', 0],
          }, // Get the review with highest likes
        },
      },
      {
        $limit: 10,
      },
    ]);
    res.send(courses);
  } catch (error) {
    console.error('Error fetching courses: ', error);
    res.status(500).send('Internal server error');
  }
});

export default landingPosts;
