import { LogEntity } from '../../entities/log.entities';
import { CheckService } from './check.service';

describe('check.service.test.ts', () => {
  const mockRepository = { saveLog: jest.fn(), getLog: jest.fn() };
  const successCallback = jest.fn();
  const errCallback = jest.fn();

  const checkService = new CheckService(mockRepository, successCallback, errCallback);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call successCallback when fetch returns true', async () => {
    const wasOk = await checkService.execute('http://google.com');
    expect(wasOk).toBeTruthy();
    expect(successCallback).toHaveBeenCalled();
    expect(errCallback).not.toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test('should call errorCallback when fetch returns false', async () => {
    const wasFalse = await checkService.execute('http://gooddgle.com');
    expect(wasFalse).toBeFalsy();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errCallback).toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
