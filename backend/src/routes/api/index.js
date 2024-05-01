//aggregate all routes in directory
import express from 'express';
import authRoutes from "./auth/index.js"
import QrRouters from './QrCode-routes.js';

const router = express.Router();

router.use('/', QrRouters);
router.use("/auth", authRoutes)

export default router;
