import { readdirSync, readFileSync, rmSync } from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import { LogEntity, LogseverityLevel } from '../../domain/entities/log.entities';

describe('fyle-system.datasource', () => {
  const logPath = path.join(__dirname, '../../../logs');

  beforeEach(() => {
    rmSync(logPath, { recursive: true, force: true });
  });

  test('should create log files if they do ot exists', () => {
    new FileSystemDatasource();
    const files = readdirSync(logPath);

    expect(files).toEqual(['logs-all.log', 'logs-hight.log', 'logs-medium.log']);
  });

  test('should save a log in logs-all.log', () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({ message: 'Test Log', level: LogseverityLevel.low, origin: 'file-system.dtasource.ts' });
    logDatasource.saveLog(log);
    const allLogs = readFileSync(`${logPath}/logs-all.log`, 'utf-8');

    expect(allLogs).toContain(JSON.stringify(log));
  });

  test('should save a log in logs-all.log and logs-medium.log', () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({ message: 'Test Log', level: LogseverityLevel.medium, origin: 'file-system.dtasource.ts' });
    logDatasource.saveLog(log);
    const allLogs = readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    const mediumLogs = readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test('should save a log in logs-all.log and logs-hight.log', () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({ message: 'Test Log', level: LogseverityLevel.hight, origin: 'file-system.dtasource.ts' });
    logDatasource.saveLog(log);
    const allLogs = readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    const hightLogs = readFileSync(`${logPath}/logs-hight.log`, 'utf-8');

    expect(allLogs).toContain(JSON.stringify(log));
    expect(hightLogs).toContain(JSON.stringify(log));
  });

  test('should return all logs', async () => {
    const logDatasource = new FileSystemDatasource();
    const logLow = new LogEntity({ message: 'Test Log', level: LogseverityLevel.low, origin: 'file-system.dtasource.ts' });
    const logMedium = new LogEntity({ message: 'Test Log', level: LogseverityLevel.medium, origin: 'file-system.dtasource.ts' });
    const loghight = new LogEntity({ message: 'Test Log', level: LogseverityLevel.hight, origin: 'file-system.dtasource.ts' });

    await logDatasource.saveLog(logLow);
    await logDatasource.saveLog(logMedium);
    await logDatasource.saveLog(loghight);

    const logsLow = await logDatasource.getLog(LogseverityLevel.low);
    const logsMedium = await logDatasource.getLog(LogseverityLevel.medium);
    const logsHight = await logDatasource.getLog(LogseverityLevel.hight);

    expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, loghight]));
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
    expect(logsHight).toEqual(expect.arrayContaining([loghight]));
  });
  test('should return an empty array if the file has no logs', async () => {
    const logDatasource = new FileSystemDatasource();
    const logs = await logDatasource.getLog(LogseverityLevel.low);
    expect(logs).toStrictEqual([]);
  });

  test('should return an error when obtaining those of an unpalled severity', async () => {
    const logDatasource = new FileSystemDatasource();
    try {
      await logDatasource.getLog('super' as LogseverityLevel);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toEqual('super not implemented');
    }
  });
});
