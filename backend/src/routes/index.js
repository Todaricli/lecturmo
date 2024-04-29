//aggregate all routes in directory
import express from 'express';
import api from './api/index.js'; // grabs all endpoints
const router = express.Router();

router.use('/api', api);

export default router;
