import express from 'express';
import passport from 'passport';
import { authenticate } from '../../../middleware/authMW.js';

const router = express.Router();

// expects username and password
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // manually set cookie cuz passport doesn't do it -_-
    res.cookie('connect.sid', 's:' + signature.sign(req.sessionID, 'MY_SECRET'));
    // err only happens for outside of auth issues
    if (err) {
      const status = err.status || 500;
      return res.status(status).json({ message: err.message });
    }
    // auth issues
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(200).json({ message: 'Login Successful' });
    });
  })(req, res, next);
});

router.get('/status', authenticate, (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

router.get('/logout', (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.status(200).json({ message: 'Logout Successful' });
  });
});

export default router;
