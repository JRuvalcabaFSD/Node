import { LogEntity, LogseverityLevel, LogEntitieOptions } from '../entities/log.entities';
import { LogDatasource } from './log.datasource';
describe('log.datasouce.ts', () => {
  const newLog = new LogEntity({
    origin: 'log.datasource.test.ts',
    message: 'test-mesage',
    level: LogseverityLevel.medium,
  });

  class MocklogDataSourse implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLog(severityLevel: LogseverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }
  test('should test the abstract class', async () => {
    const mockLogDatasource = new MocklogDataSourse();
    expect(mockLogDatasource).toBeInstanceOf(MocklogDataSourse);
    expect(typeof mockLogDatasource.saveLog).toBe('function');
    expect(typeof mockLogDatasource.getLog).toBe('function');

    await mockLogDatasource.saveLog(newLog);
    const logs = await mockLogDatasource.getLog(LogseverityLevel.hight);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
