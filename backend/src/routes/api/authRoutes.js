import express from 'express';
import passport from 'passport';
import { authenticate } from '../../middleware/authMW.js';

const router = express.Router();

// expects username and password
router.post(
  '/login',
  passport.authenticate('local', {
    failureMessage: true,
  }),
  (req, res) => {
    // console.log("req.session:", req.session)
    res.status(200).json({message: 'Login Successful'});
  },
);

router.get('/status', authenticate, (req, res) => {
  console.log('req.session:', req.session);
  console.log('req.user:', req.user);
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

router.get('/logout', (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.status(200).json({message: 'Logout Successful'});
  });
});

export default router;
