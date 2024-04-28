import express from "express";
import passport from 'passport';

const router = express.Router();

router.post('/', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200)
})

router.get('/status', (req, res) => {
  console.log("req.user:", req.user)
  return req.user ? res.send(req.user) : res.sendStatus(401);
})

export default router;