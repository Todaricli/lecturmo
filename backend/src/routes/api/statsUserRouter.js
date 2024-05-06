import { Router } from "express";

const statsUserRouter = Router();

statsUserRouter.get('/stats', async (req,res) => {
    const userId = req.user;

    res.send(userId)
})

export default statsUserRouter;