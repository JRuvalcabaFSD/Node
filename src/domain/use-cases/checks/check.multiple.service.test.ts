import { LogEntity } from '../../entities/log.entities';
import { CheckService } from './check.service';
import { CheckServiceMultiple } from './check.multiple.service';

describe('check.service.mutiple.test.ts', () => {
  const mockFileSystemRepository = { saveLog: jest.fn(), getLog: jest.fn() };
  const mockMongoRepository = { saveLog: jest.fn(), getLog: jest.fn() };
  const mockPostgresRepository = { saveLog: jest.fn(), getLog: jest.fn() };
  const successCallback = jest.fn();
  const errCallback = jest.fn();

  const checkMultipleService = new CheckServiceMultiple([mockFileSystemRepository, mockMongoRepository, mockPostgresRepository], successCallback, errCallback);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call successCallback when fetch returns true', async () => {
    const wasOk = await checkMultipleService.execute('http://google.com');
    expect(wasOk).toBeTruthy();
    expect(successCallback).toHaveBeenCalled();
    expect(errCallback).not.toHaveBeenCalled();
    expect(mockFileSystemRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockMongoRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockPostgresRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test('should call errorCallback when fetch returns false', async () => {
    const wasFalse = await checkMultipleService.execute('http://gooddgle.com');
    expect(wasFalse).toBeFalsy();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errCallback).toHaveBeenCalled();
    expect(mockFileSystemRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockMongoRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockPostgresRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
