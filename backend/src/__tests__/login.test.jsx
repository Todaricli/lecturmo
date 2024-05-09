import request from 'supertest';
import app from '../../../frontend/src/App.jsx';
import sinon from 'sinon';
import {describe, beforeEach, afterEach,test} from 'vitest';
import {passport} from 'passport';

// Mock the passport object
const mockPassport = {
    authenticate: (strategy, callback) => {
      callback(null, false, { message: 'Invalid credentials' }); // Mock implementation
    },
  };

describe('auth router', () => {
  let mockPassportAuthenticate;

  beforeEach(() => {
    // mockPassportAuthenticate = sinon.stub(passport, 'authenticate');
        // Swap the original with our mock during test execution
        global.passport = mockPassport;
        
         // Stub the authenticate function with a custom behavior
  mockPassportAuthenticate = sinon.stub().rejects(new Error('Internal server error'));
  // Replace the original authenticate function with our mock during test execution
  sinon.stub(passport, 'authenticate').returns(mockPassportAuthenticate);
  });

  afterEach(() => {
    // sinon.restore();

        // Restore the original passport object after tests
        global.passport = originalPassport;
  });

  // Successful Login
  test('POST /login - successful login', async () => {
    const mockUser = { username: 'test_user', id: 1 };

    mockPassportAuthenticate.resolves(null, mockUser);

    const response = await request(app)
      .post('/login')
      .send({ username: 'test_user', password: 'valid_password' }); // Adjust credentials

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Login Successful' });
  });

  // Failed Login (Invalid Credentials)
  test('POST /login - invalid credentials', async () => {
    // mockPassportAuthenticate.resolves(null, false, { message: 'Invalid username or password' });

    const response = await request(app)
      .post('/login')
      .send({ username: 'invalid_user', password: 'wrong_password' }); // Adjust credentials

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid username or password' });
  });

  // Internal Server Error during Authentication
  test('POST /login - internal server error during authentication', async () => {
    mockPassportAuthenticate.rejects(new Error('Internal server error'));

    const response = await request(app)
      .post('/login')
      .send({ username: 'test_user', password: 'valid_password' }); // Adjust credentials

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: 'Internal server error' });
  });
})