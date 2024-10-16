// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');

    throttledGetDataFromApi('url');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockInstance = {
      get: () => Promise.resolve({ data: 'some data' }),
    } as unknown as AxiosInstance;
    jest.spyOn(axios, 'create').mockImplementation(() => mockInstance);
    jest.spyOn(mockInstance, 'get');
    jest.advanceTimersByTime(THROTTLE_TIME);

    await throttledGetDataFromApi('url');

    expect(mockInstance.get).toHaveBeenCalledWith('url');
  });

  test('should return response data', async () => {
    const mockInstance = {
      get: () => Promise.resolve({ data: 'some data' }),
    } as unknown as AxiosInstance;
    jest.spyOn(axios, 'create').mockImplementation(() => mockInstance);
    jest.advanceTimersByTime(THROTTLE_TIME);

    const result = await throttledGetDataFromApi('url');

    expect(result).toBe('some data');
  });
});
