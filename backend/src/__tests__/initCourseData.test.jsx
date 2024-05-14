import { faker } from '@faker-js/faker';
import * as courseSchema from '../schemas/courseSchema.js';
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


  
  

  

