//aggregate all routes in directory
import express from 'express';
import example from "./exampleRoutes.js";
import auth from "./authRoutes.js"
import regAndEmail from "./auth/index.js"

const router = express.Router();

router.use("/example", example);
router.use("/auth", auth);
router.use("/reg", regAndEmail)

export default router;
