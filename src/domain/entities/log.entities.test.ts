import { LogEntity, LogseverityLevel } from './log.entities';
describe('log.entities.test.ts', () => {
  const dataObj = {
    message: 'Hola mundo',
    level: LogseverityLevel.medium,
    origin: 'log.entities.ts',
  };
  test('should create a LogEntity instance', () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createAt).toBeInstanceOf(Date);
  });
  test('should create a LogEntity from json', () => {
    const json = `{"message":"Service https://google.com working","level":"low","createAt":"2025-03-30T00:01:00.862Z","origin":"check.service.ts"}`;
    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe('Service https://google.com working');
    expect(log.level).toBe(LogseverityLevel.low);
    expect(log.origin).toBe('check.service.ts');
    expect(log.createAt).toBeInstanceOf(Date);
  });

  test('should create a LogEntity intance from Object', () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createAt).toBeInstanceOf(Date);
  });
});
