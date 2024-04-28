//aggregate all routes in directory
import express from 'express';

const router = express.Router();

import example from "./exampleRoutes.js";

router.use("/example", example);

export default router;
