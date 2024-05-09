import { run } from '../config/init-db'; // Adjust the import path accordingly
import { describe, beforeEach, it, vi, expect } from 'vitest';
import {mongoose} from 'mongoose';
import { initUsers, updateUserForeignKeys } from '../config/data/initUserData.js';
import { initCourses, updateCourseForeignKeys } from '../config/data/initCourseData.js';

describe('Database initialization script', () => {
  let logSpy, errorSpy, connectSpy, dropDatabaseSpy, initUsersSpy, initCoursesSpy, updateUserForeignKeysSpy, updateCourseForeignKeysSpy, disconnectSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log');
    errorSpy = vi.spyOn(console, 'error');
    connectSpy = vi.spyOn(mongoose, 'connect');
    dropDatabaseSpy = vi.spyOn(mongoose.connection, 'dropDatabase');
    // initUsersSpy = vi.spyOn(initUsers);
    // initCoursesSpy = vi.spyOn(initCourses);
    // updateUserForeignKeysSpy = vi.spyOn(updateUserForeignKeys);
    // updateCourseForeignKeysSpy = vi.spyOn(updateCourseForeignKeys);
    disconnectSpy = vi.spyOn(mongoose, 'disconnect');
  });

  it('should run without errors and complete successfully', async () => {
    await run();
    expect(logSpy).toHaveBeenCalled(); // Ensure console.log is called
    // expect(errorSpy).not.toHaveBeenCalled(); // Ensure console.error is not called
    expect(connectSpy).toHaveBeenCalled(); // Ensure mongoose.connect is called
    expect(dropDatabaseSpy).toHaveBeenCalled(); // Ensure mongoose.connection.dropDatabase is called
    // expect(initUsersSpy).toHaveBeenCalled(); // Ensure initUsers is called
    // expect(initCoursesSpy).toHaveBeenCalled(); // Ensure initCourses is called
    // expect(updateUserForeignKeysSpy).toHaveBeenCalled(); // Ensure updateUserForeignKeys is called
    // expect(updateCourseForeignKeysSpy).toHaveBeenCalled(); // Ensure updateCourseForeignKeys is called
    expect(disconnectSpy).toHaveBeenCalled(); // Ensure mongoose.disconnect is called
  });
});
