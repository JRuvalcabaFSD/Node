import { envs } from './config/envs';
import { Server } from './presentation/server';

jest.mock('./presentation/server');

describe('Testing App', () => {
  test('Should the server has been invoked with the expected methods', async () => {
    await import('../src/app');
    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({ port: envs.PORT, public_path: envs.PUBLIC_PATH, routes: expect.any(Function) });
    expect(Server.prototype.start).toHaveBeenCalled();
  });
});
