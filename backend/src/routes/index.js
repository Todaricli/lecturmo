//aggregate all routes in directory
import express from 'express';

const router = express.Router();

import api from './api/index.js'; // grabs all endpoints
import auth from './auth/routes.js';

router.use('/api', api);
router.use('/auth', auth);

export default router;
