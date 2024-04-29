import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { createEmptyCourses, populateCourses } from './data/initialCourseData.js';
import { createEmptyUsers, populateUsers } from './data/initialUserData.js';

// This is a standalone program which will populate the database with initial data.
async function run() {
  try {
    console.log('Connecting to database.');
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

    await mongoose.connection.dropDatabase();
    console.log("Database cleared.");

    // barebones creation just to allow foreign key referencing
    const users = await createEmptyUsers();
    const courses = await createEmptyCourses();

    await populateUsers(users, courses)
    console.log('Users created and updated successfully');
    await populateCourses(users, courses)
    console.log('Courses created and updated successfully');
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database.');
  }
}

run();
