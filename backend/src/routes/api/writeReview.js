import express from 'express';
import { addReview } from '../../controllers/reviewController.js';

const router = express.Router();

router.post('/add-review', async (req, res) => {
    const courseId = req.query.courseId;

    const {
        difficulty,
        content,
        quality,
        review,
    } = req.body;

    // Prepare update data
    const reviewData = {};
    reviewData.userId = req.user._id
    reviewData.dummyId = req.user.user_dummy_id;
    reviewData.content = review;
    reviewData.likes = [];
    reviewData.dummyLikes = [];
    reviewData.difficultyRating = difficulty;
    reviewData.contentRating = content;
    reviewData.qualityRating = quality;

    try {
        const newReview = await addReview(courseId, reviewData);
        res
            .status(200)
            .json({ message: 'Review successfully added', newReview: newReview });
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
    }
});

export default router;