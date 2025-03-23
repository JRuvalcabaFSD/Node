import {
  buildLogger,
  logger as windston,
} from './../../src/plugins/logger.plugin';

describe('loggers', () => {
  test('should return function logger and error', () => {
    const logger = buildLogger('test');
    expect(typeof logger.log).toBe('function');
    expect(typeof logger.error).toBe('function');
  });
  test('should log a message', () => {
    const winstonLoggerMock = jest.spyOn(windston, 'log');

    const message = 'test message';
    const service = 'test service';
    const logger = buildLogger(service);
    logger.log(message);

    expect(winstonLoggerMock).toHaveBeenCalledWith(
      'info',
      expect.objectContaining({ level: 'info', message, service }),
    );
  });
});
