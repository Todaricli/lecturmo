// Configure environment variables
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import routes from './routes/routes.js';

// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;

// Creates the express server
export async function startExpress() {
  const app = express();

  // Configure middleware
  app.use(morgan('combined'));
  app.use(cors());
  app.use(express.json());
  app.use(express.static('public'));
  app.use(
    session({
      secret: 'the secret',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000 * 60, //one hour expiry
      }
    }),
  );

  // Import and use our application routes.
  app.use('/', routes);

  app.listen(PORT, () =>
    console.log(`App server listening on port ${PORT}!`),
  );
}