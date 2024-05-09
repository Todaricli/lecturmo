import { faker } from '@faker-js/faker';
import * as courseSchema from '../schemas/courseSchema.js';
// import * as initCourseData from '../config/data/initCourseData.js';
import { spyOn, mock, vi, describe, afterEach, test, expect, toEqual } from 'vitest';
import { initCourses, fetchUserIds, updateCourseForeignKeys, createEmptyCourses, populateCourses } from '../config/data/initCourseData.js';

test('fetchUserIds builds a map of user IDs', async () => {
    const users = [
      { _id: 'user123', user_dummy_id: 'dummy1' },
      { _id: 'user456', user_dummy_id: 'dummy2' },
    ];
  
    const userMap = await fetchUserIds(users);
  
    expect(userMap).toEqual({ dummy1: 'user123', dummy2: 'user456' });
  });


  
  
//   test('populateCourses creates courses with random details', async () => {
//     const mockUsers = [
//       { _id: 'user123' },
//       { _id: 'user456' },
//     ];
  
//     const mockCourses = [{}]; // Placeholder for an empty course object
  
//     // Mock specific Faker.js functions directly (without jest.fn())
//     faker.company.catchPhrase = () => 'Awesome Course'; // Mock return value
//     faker.helpers.arrayElement = () => mockUsers[0]; // Mock return value
//     faker.lorem.paragraph = () => 'This is a detailed course description.'; // Mock return value
//     faker.commerce.department = () => 'Software Engineering'; // Mock return value
//     faker.number.int = () => 3; // Mock return value for 3 reviews
// faker.number.int = () => true; // Mock return value for one like (overwrite previous)
// faker.number.int = () => 4; // Mock return value for rating (overwrite previous)

  
//     const updatedCourses = await populateCourses(mockUsers, mockCourses);
  
//     // expect(updatedCourses).toBeDefined(); // Check if it's not undefined
//     expect(updatedCourses).toBeInstanceOf(Array); // Expect an array
//     expect(updatedCourses.length).toBe(1); // Expect one updated course

//     expect(updatedCourses[0].courseName).toBe('Awesome Course');
//     expect(updatedCourses[0].lecturer).toBe(mockUsers[0]._id);
//     expect(updatedCourses[0].description).toBe('This is a detailed course description.');
//     expect(updatedCourses[0].category).toBe('Software Engineering');
//     expect(updatedCourses[0].reviews.length).toBe(3); // Three random reviews
//     expect(updatedCourses[0].reviews[0].likes.length).toBe(1); // One like for first review
  
//   });
  

