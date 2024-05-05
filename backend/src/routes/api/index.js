//aggregate all routes in directory
import express from 'express';
import authRoutes from './auth/index.js';
import QrRouters from './QrCode-routes.js';
import LectureRouter from './lectureRouter.js';
import SearchRouter from './searchRouters.js';
import landingPosts from './landingPosts.js';

const router = express.Router();

router.use('/', QrRouters);
router.use('/auth', authRoutes);
router.use('/', landingPosts);
router.use('/', LectureRouter)
router.use('/', SearchRouter)

export default router;
