//aggregate all routes in directory
import express from 'express';
import example from "./exampleRoutes.js";
import auth from "./authRoutes.js"

const router = express.Router();

router.use("/example", example);
router.use("/auth", auth);

export default router;
