import { initializeDatabase, startServer } from './server.js';
import { expect } from 'chai';

describe('Server tests', () => {
  beforeEach(() => {
    global.console.log = jest.fn(); // Mock console.log
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should initialize database connection successfully', async () => {
    await initializeDatabase();
    expect(global.console.log).toHaveBeenCalledWith('Successfully connected to MongoDB.');
  });

  it('should start server successfully', async () => {
    await startServer();
    expect(global.console.log).toHaveBeenCalledWith('-'.repeat(30));
    expect(global.console.log).toHaveBeenCalledWith('Starting Server v1.0.0');
    expect(global.console.log).toHaveBeenCalledWith('Successfully connected to MongoDB.');
  });
});
