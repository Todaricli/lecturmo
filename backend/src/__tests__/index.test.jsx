import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { startExpress } from '../server';
import { beforeAll, afterAll, test, expect } from 'vitest';
import {toEqual} from '@testing-library/react';

let mongoServer;
let mongoUri;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
  
    // Connect to the MongoDB instance
    await mongoose.connect(mongoUri);

    // Unregister the User model if it's already defined
  if (mongoose.models.User) {
    delete mongoose.models['User'];
  }

      // Redefine the User model with the new schema
  const userSchema = new mongoose.Schema({
    user_dummy_id: String,
    fname: String,
    lname: String,
    gender: String,
    dob: Date,
    username: String,
    password: String,
    email: String,
    rank: String,
    profileDescription: String,
    avatarPicture: String,
    roles: String,
    courses: [{
      lectures: [],
      courseId: String
    }],
    isVerified: Boolean,
    emailToken: String,
    createdAt: Date,
    updatedAt: Date
  });

  mongoose.model('User', userSchema);
  });
  
  afterAll(async () => {
    // Disconnect from the MongoDB instance and stop the server
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  
  test('Insert User into MongoDB', async () => {
    // Define the user document to insert
    const userDocument = {
      _id: '6639a824d563a06c2e4c2dc1',
      user_dummy_id: 'lec1',
      fname: 'Prof.',
      lname: 'Da Man',
      gender: 'male',
      dob: new Date(0),
      username: 'lec1',
      password: '$2b$12$VT3V27DMmYKQK33e0jVUr.MIA/.3f5zwVpyouQoEzk6lZSoKh35FG',
      email: 'test@gmail.com',
      rank: 'gold',
      profileDescription: 'Senior Lecturer in Computer Science with a focus on AI and machine learning.',
      avatarPicture: '/assets/Avatar/bird1.png',
      roles: 'lecturer',
      courses: [
        {
          lectures: [],
          _id: '6639a824d563a06c2e4c2dc2'
        },
        {
          courseId: '6639a824d563a06c2e4c2de1',
          lectures: [{ lectureId: '6639a824d563a06c2e4c2de4' }],
          _id: '6639b381d1feaf427760f51b'
        }
      ],
      isVerified: true,
      emailToken: null,
      __v: 0,
      createdAt: new Date(1715054628229),
      updatedAt: new Date(1715057537892)
    };

      // Retrieve the User model
  const UserModel = mongoose.model('User');
  
    // Insert the user document into the 'users' collection
    const insertedUser = await UserModel.create(userDocument);
  
    // Retrieve the inserted user document from the database
    const retrievedUser = await UserModel.findById(insertedUser._id);

    // Assert that the retrieved user document matches the inserted one
  expect(retrievedUser._id).toEqual(insertedUser._id);
  expect(retrievedUser.user_dummy_id).toEqual(userDocument.user_dummy_id);
  
});