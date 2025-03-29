import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogseverityLevel } from '../../domain/entities/log.entities';

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = 'logs/';
  private readonly allLogPath = 'logs/logs-all.log';
  private readonly mediumLogPath = 'logs/logs-medium.log';
  private readonly hightLogPath = 'logs/logs-hight.log';

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!existsSync(this.logPath)) mkdirSync(this.logPath);
    [this.allLogPath, this.mediumLogPath, this.hightLogPath].forEach((path) => {
      if (!existsSync(path)) writeFileSync(path, '');
    });
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    appendFileSync(this.allLogPath, logAsJson);

    if (newLog.level === LogseverityLevel.low) return;

    if (newLog.level === LogseverityLevel.medium) {
      appendFileSync(this.mediumLogPath, logAsJson);
    } else {
      appendFileSync(this.hightLogPath, logAsJson);
    }
  }

  private getLogFromFile = (path: string): LogEntity[] => {
    const content = readFileSync(path, 'utf-8');
    const logs = content.split('\n').map(LogEntity.fromJson);
    return logs;
  };

  async getLog(severityLevel: LogseverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogseverityLevel.low:
        return this.getLogFromFile(this.allLogPath);
      case LogseverityLevel.medium:
        return this.getLogFromFile(this.mediumLogPath);
      case LogseverityLevel.hight:
        return this.getLogFromFile(this.hightLogPath);
      default:
        throw new Error(`${severityLevel} not implemented`);
    }
  }
}
