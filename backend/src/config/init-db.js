import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { Person } from '../schemas/person-schema.js';

// initial data
const personData = [
  {
    name: 'Alice Johnson',
    age: 28,
    email: 'alice.johnson@example.com',
  },
  {
    name: 'Bob Smith',
    age: 34,
    email: 'bob.smith@example.com',
  },
  {
    name: 'Charlie Brown',
    age: 22,
    email: 'charlie.brown@example.com',
  },
  {
    name: 'Diana Prince',
    age: 32,
    email: 'diana.prince@example.com',
  },
  {
    name: 'Edward Norton',
    age: 41,
    email: 'edward.norton@example.com',
  },
  {
    name: 'Fiona Gallagher',
    age: 29,
    email: 'fiona.gallagher@example.com',
  },
];

// This is a standalone program which will populate the database with initial data.
async function run() {
  try {
    console.log('Connecting to database.');
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    await Person.deleteMany({});
    await Person.insertMany(personData);
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database.');
  }
}

run();
