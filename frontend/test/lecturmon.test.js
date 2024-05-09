// sum.test.js
import {describe, expect, test, as } from 'vitest'
import { postRequest } from '../src/services/postRequest';
import { getRequest } from '../src/services/getRequest';
import assert from 'assert';

const BASE_URL = import.meta.env.VITE_EXPRESS_APP_ENDPOINT_API_URL ?? '';

describe("authRoutesTesting", () => {

  test("login valid user", async () => {
    const body = {
      username: 'user1a',
      password: '123',
    };

    const response = await postRequest(`${BASE_URL}/auth/login`, body)

    expect(response.status).toBe(200)

  })

  test("login invalid user", async () => {
    const body = {
      username: 'user_blabla',
      password: '123',
    };

    const response = await postRequest(`${BASE_URL}/auth/login`, body)

    expect(response.status).toBe(401)

  })

  test("login invalid user, but not valid password", async () => {
    const body = {
      username: 'user1a',
      password: 'blablabla',
    };

    const response = await postRequest(`${BASE_URL}/auth/login`, body)

    expect(response.status).toBe(401)
  })

  test("register a valid user", async () => {

    
    const formData = {
      username: 'userBlabla',
      password: '12345@',
      confirmPassword: '12345@',
      email: '',
      verifyEmail: false,
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      avatarURL: ''
    }

    const response = await postRequest(`${BASE_URL}/auth/login`, body)
  })
})