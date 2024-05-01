//aggregate all routes in directory
import express from 'express';
import auth from './authRoutes.js';
import QrRouters from './QrCode-routes.js';
import landingPosts from './landingPosts.js';

const router = express.Router();

router.use('/', auth);
router.use('/', QrRouters);
router.use('/', landingPosts);

export default router;
