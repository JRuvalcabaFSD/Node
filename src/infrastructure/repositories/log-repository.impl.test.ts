import { LogEntity, LogseverityLevel } from '../../domain/entities/log.entities';
import { LogRepositoryImpl } from './log-repository.impl';

describe('log-repository.impl', () => {
  const log = new LogEntity({ message: 'Test message', level: LogseverityLevel.low, origin: 'log-repository.impl.test.ts' });
  const mockLogDatasource = { saveLog: jest.fn(), getLog: jest.fn() };
  const logRepository = new LogRepositoryImpl(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('savelog should be call the datasource whidt arguments', async () => {
    await logRepository.saveLog(log);
    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });

  test('getlog should be call the datasource whidt arguments', async () => {
    await logRepository.getLog(LogseverityLevel.low);
    expect(mockLogDatasource.getLog).toHaveBeenCalledWith(LogseverityLevel.low);
  });
});
