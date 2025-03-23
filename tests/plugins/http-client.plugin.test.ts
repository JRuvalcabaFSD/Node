import { httpClientPlugin } from '../../src/plugins/http-client.plugin';

describe('httpClientPlugin', () => {
  test('should return a sring', async () => {
    const data = await httpClientPlugin.get(
      'https://jsonplaceholder.typicode.com/todos/1',
    );
    expect(data).toEqual({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: expect.any(Boolean),
    });
  });

  test('should have POST,PUT and delete methods', () => {
    expect(typeof httpClientPlugin.post).toEqual('function');
    expect(typeof httpClientPlugin.put).toEqual('function');
    expect(typeof httpClientPlugin.delete).toEqual('function');
    expect(typeof httpClientPlugin.get).toEqual('function');
  });
});
