import express from 'express';
import verifyEmail from './verifyEmail.js';
import register from './register.js';
import login from './login.js';

const router = express.Router();

router.use('/', verifyEmail);
router.use('/', register);
router.use('/', login);

export default router;
