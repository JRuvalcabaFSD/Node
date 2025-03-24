import { ServerApp } from './presentation/server.app';

describe('App', () => {
  test('should call Server.run width values', async () => {
    const serverRunMock = jest.fn();

    ServerApp.run = serverRunMock;
    process.argv = ['node', 'app.ts', '-b', '10', '-l', '20', '-s', 'true', '-n', 'custom-name', '-d', 'custom-path'];

    await import('./app');

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      fileDestination: 'custom-path',
      fileName: 'custom-name',
      limit: 20,
      showTable: true,
    });
  });
});
