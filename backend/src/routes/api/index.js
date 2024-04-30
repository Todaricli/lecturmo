//aggregate all routes in directory
import express from 'express';
import auth from './authRoutes.js';

const router = express.Router();

router.use('/auth', auth);

export default router;
