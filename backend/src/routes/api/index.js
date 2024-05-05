//aggregate all routes in directory
import express from 'express';
import authRoutes from './auth/index.js';
import QrRouters from './QrCode-routes.js';
import landingPosts from './landingPosts.js';
import SinglePageRouters from './singlePostRoute.js';

const router = express.Router();

router.use('/', QrRouters);
router.use('/auth', authRoutes);
router.use('/landing-posts', landingPosts);
router.use('/single-page', SinglePageRouters)

export default router;
