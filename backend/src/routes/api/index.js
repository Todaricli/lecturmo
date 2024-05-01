//aggregate all routes in directory
import express from 'express';
import auth from "./authRoutes.js"
import regAndEmail from "./auth/index.js"
import QrRouters from './QrCode-routes.js';

const router = express.Router();

router.use('/', auth);
router.use('/', QrRouters);
router.use("/reg", regAndEmail)

export default router;
