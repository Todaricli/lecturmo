//aggregate all routes in directory
import express from 'express';
import authRoutes from './auth/index.js';
import QrRouters from './QrCode-routes.js';
import LectureRouter from './lectureRouter.js';
import SearchRouter from './searchRouters.js';
import landingPosts from './landingPosts.js';
import SinglePageRouters from './singlePostRoute.js';
import statsUserRouter from './statsUserRouter.js';
import userProfileRoutes from './userProfilePage.js';
import lecturAi from './openAi.js';
import writeReviewRoutes from './WriteReview.js';

const router = express.Router();

router.use('/', QrRouters);
router.use('/auth', authRoutes);
router.use('/', landingPosts);
router.use('/', LectureRouter);
router.use('/', SearchRouter);
router.use('/', userProfileRoutes);
router.use('/lecturai', lecturAi);
router.use('/', SinglePageRouters);
router.use('/', statsUserRouter);
router.use('/', writeReviewRoutes);

export default router;
