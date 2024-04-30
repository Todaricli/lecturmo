// Configure environment variables
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './config/strategies/local-strategy.js';

// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;
const SECRET_KEY = process.env.SECRET_KEY ?? '39608663';

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the incoming origin is from localhost on any port
    if (!origin || /^https?:\/\/localhost(:\d+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
};

// Creates the express server
export async function startExpress() {
  const app = express();

  // Configure middleware
  app.use(morgan('combined'));
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.static('public'));

  app.use(cookieParser(SECRET_KEY));
  app.use(
    session({
      secret: SECRET_KEY,
      saveUninitialized: false,
      resave: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_CONNECTION_STRING,
        collection: 'sessions',
      }), //session is now stored in db
      cookie: {
        maxAge: 60 * 60 * 1000, //one hour expiry
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Import and use our application routes.
  app.use('/', routes);

  app.listen(PORT, () => console.log(`App server listening on port ${PORT}!`));
}