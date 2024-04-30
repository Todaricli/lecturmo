import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../../schemas/userSchema.js';
import { comparePassword } from '../../utils/useBcrypt.js';

// takes validated user and stores into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error('User Not Found');
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username });
      console.log('findUser:', findUser);
      if (!findUser) throw new Error('User not found');

      const match = await comparePassword(password, findUser.password);
      if (!match) {
        throw new Error('Wrong Credentials');
      }
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  }),
);