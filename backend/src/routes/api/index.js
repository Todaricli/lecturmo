//aggregate all routes in directory
import express from 'express';

const router = express.Router();

import auth from "./authRoutes.js";
import example from "./exampleRoutes.js";

router.use("/auth", auth);
router.use("/example", example);

export default router;
