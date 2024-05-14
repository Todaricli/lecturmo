import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getRequest } from '../../services/getRequest'; // Replace 'yourRequestFile' with the actual file path

describe('getRequest function', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should return data for successful GET request', async () => {
    const mockData = { id: 1, name: 'Test' };
    mockAxios.onGet('/api/test').reply(200, mockData);

    const result = await getRequest('/api/test');
    expect(result).toEqual(mockData);
  });

  it('should return error information for failed GET request', async () => {
    const errorMessage = 'Not found';
    mockAxios.onGet('/api/test').reply(404, { message: errorMessage });

    const result = await getRequest('/api/test');
    expect(result).toEqual({
      error: true,
      status: 404,
      message: errorMessage,
    });
  });

  it('should return error information for network error', async () => {
    mockAxios.onGet('/api/test').networkError();

    const result = await getRequest('/api/test');
    expect(result).toEqual({
      error: true,
      status: 500,
      message: 'Unknown error occurred',
    });
  });
});
