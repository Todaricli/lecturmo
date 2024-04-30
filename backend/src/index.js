import { startExpress } from './server.js';
import mongoose from 'mongoose';

const VERSION = '1.0.0';
// Start the server running, connect to db.
const initializeDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log('Successfully connected to MongoDB.');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
};

async function startServer() {
  console.log('-'.repeat(30));
  console.log(`Starting Server v${VERSION}`);
  await initializeDatabase();
  await startExpress();
}

startServer();