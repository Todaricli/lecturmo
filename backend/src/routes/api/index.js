//aggregate all routes in directory
import express from 'express';
import authRoutes from './auth/index.js';
import QrRouters from './QrCode-routes.js';
import landingPosts from './landingPosts.js';
import SinglePageRouters from './singlePostRoute.js';
import statsUserRouter from './statsUserRouter.js';

const router = express.Router();

router.use('/', QrRouters);
router.use('/auth', authRoutes);
router.use('/', landingPosts);
router.use('/', SinglePageRouters)
router.use('/', statsUserRouter)

export default router;
