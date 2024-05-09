import { expect, test, describe, beforeEach, afterEach } from 'vitest';
import SearchRouter from '../routes/api/searchRouters.js'; // Assuming SearchRouter is in ./SearchRouter.js
import { Course } from '../schemas/courseSchema.js'; // Assuming Course model is in ./schemas/courseSchema.js
// import { mock } from 'vitest-mock-decorators'; // Optional mocking library
import sinon from 'sinon';
import nock from 'nock';

test('SearchRouter should return search results when search term is provided', async () => {
    // Mock expected HTTP requests
    nock('http://localhost:27017/') // Replace with your MongoDB connection string if different
      .post('/test-db/courses') // Adjust based on your database and collection name
      .reply(200, [ // Mock response for Course.find queries
        { courseName: 'Matching Course 1' },
        { courseName: 'Matching Course 2' },
      ]);
  
    const req = new Request('http://localhost:27017/search', {
      method: 'POST',
      body: JSON.stringify({ searchterm: 'test search' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = new Response();
  
    await SearchRouter(req, res);
  
    const data = await res.json();
  
    // Assertions about the response
    expect(res.status).toBe(200);
    expect(data).toEqual({
      courses: [
        { courseName: 'Matching Course 1' },
        { courseName: 'Matching Course 2' },
      ],
      category: [], // Category results are currently empty (modify if needed)
    });
  });
  

// describe('SearchRouter', () => {
//   let mockCourseFind; // Mock the Course.find function

//   async function setupMocks() {
//     console.log('Before stubbing:', Course.find); // Log the state of Course.find before stubbing
//     mockCourseFind = sinon.stub(Course, 'find'); // Stub Course.find using Sinon
//     console.log('After stubbing:', Course.find);  // Log the state of Course.find after stubbing  
// }

//   beforeEach(async() => {
//     // mockCourseFind = mock(Course.find); // Mock Course.find using vitest-mock-decorators (optional)
//     // mockCourseFind = sinon.stub(Course, 'find');
//     await setupMocks();
// });

// //   afterEach(() => {
// //     mockCourseFind.mockRestore(); // Restore original Course.find function after tests (if using mocks)
// //   });

//   test('should return search results when search term is provided', async () => {
//     const expectedCourses = [{ courseName: 'Matching Course' }]; // Example search results
//     mockCourseFind.mockResolvedValueOnce(expectedCourses); // Stub Course.find to return expected data

//     const req = new Request('/search', {
//       method: 'POST',
//       body: JSON.stringify({ searchterm: 'test search' }),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     const res = new Response();

//     await SearchRouter(req, res);

//     const data = await res.json();

//     expect(mockCourseFind).toHaveBeenCalledTimes(2); // Expect Course.find to be called twice
//     expect(mockCourseFind).toHaveBeenCalledWith({ courseName: { $regex: 'test search', $options: 'i' } });
//     expect(mockCourseFind).toHaveBeenCalledWith({ category: { $regex: 'test search', $options: 'i' } });
//     expect(data).toEqual({ courses: expectedCourses, category: [] }); // Expect empty category results
//   });

//   test('should return empty response when search term is not provided', async () => {
//     const req = new Request('/search', { method: 'POST', body: JSON.stringify({}) });
//     const res = new Response();

//     await SearchRouter(req, res);

//     const data = await res.json();

//     expect(res.status).toBe(200); // Expect successful response
//     expect(data).toEqual({}); // Expect empty response
//   });

// });
