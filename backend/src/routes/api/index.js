//aggregate all routes in directory
import express from 'express';
import example from "./exampleRoutes.js";
import auth from "./authRoutes.js"
import regAndEmail from "./auth/index.js"
import auth from './authRoutes.js';
import QrRouters from './QrCode-routes.js';

const router = express.Router();

router.use('/', auth);
router.use('/', QrRouters);
router.use("/reg", regAndEmail)

export default router;
