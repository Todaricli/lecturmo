import express from 'express';
import verifyEmail from "./verifyEmail.js"
import register from "./register.js"

const router = express.Router();

router.use("/", verifyEmail);
router.use("/", register)

export default router