import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { postRequest } from '../../services/postRequest'; // Replace 'yourRequestFile' with the actual file path

describe('postRequest function', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should return data for successful POST request', async () => {
    const mockData = { id: 1, name: 'Test' };
    const requestBody = { key: 'value' };
    mockAxios.onPost('/api/test', requestBody).reply(200, mockData);

    const result = await postRequest('/api/test', requestBody);
    expect(result).toEqual(mockData);
  });

  it('should return error information for failed POST request', async () => {
    const errorMessage = 'Bad request';
    const requestBody = { key: 'value' };
    mockAxios.onPost('/api/test', requestBody).reply(400, { message: errorMessage });

    const result = await postRequest('/api/test', requestBody);
    expect(result).toEqual({
      error: true,
      status: 400,
      message: errorMessage,
    });
  });

  it('should return error information for network error', async () => {
    const requestBody = { key: 'value' };
    mockAxios.onPost('/api/test', requestBody).networkError();

    const result = await postRequest('/api/test', requestBody);
    expect(result).toEqual({
      error: true,
      status: 500,
      message: 'Unknown error occurred',
    });
  });
});
