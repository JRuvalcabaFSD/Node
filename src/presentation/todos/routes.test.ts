import request from 'supertest';
import { testServer } from '../../test-server';

describe('todo route testing', () => {
  beforeAll(async () => {
    await testServer.start();
  });
  afterAll(() => {
    testServer.close();
  });
  test('should return todos api/todos', async () => {
    await request(testServer.app).get('/api/todos').expect(200);
  });
});
