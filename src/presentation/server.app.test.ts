import { CreateTable } from '../domain/uses-cases/create-table.use-case';
import { ServerApp } from './server.app';
import { SaveFile } from '../domain/uses-cases/save-file.use-case';
import { existsSync, rmSync } from 'fs';

describe('ServerApp', () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileName: 'test-name',
    fileDestination: 'test-path',
  };
  const logMock = jest.fn();
  const errorLogMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    if (existsSync('test-path')) rmSync('test-path', { recursive: true });
  });

  test('should create ServerApp instance', () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');
  });

  test('should run ServerApp with options', () => {
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

    console.log = logMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledTimes(2);
    expect(logMock).toHaveBeenCalledWith('Server running...');
    expect(logMock).toHaveBeenCalledWith('File created!');
    expect(logMock).toHaveBeenLastCalledWith('File created!');

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({ fileContet: expect.any(String), fileDestination: options.fileDestination, fileName: `${options.fileName} ${options.base}` });
  });

  test('should run ServerApp with options mocked', () => {
    const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
    let saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    console.error = errorLogMock;

    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith('Server running...');
    expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
    expect(saveFileMock).toHaveBeenCalledWith({ fileContet: '1 x 2 = 2', fileDestination: 'test-path', fileName: 'test-name 2' });
    expect(logMock).toHaveBeenCalledWith('File created!');
    expect(errorLogMock).not.toHaveBeenCalledWith();
  });
});
