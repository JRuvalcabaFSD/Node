import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogseverityLevel } from '../../domain/entities/log.entities';
import { LogRepository } from '../../domain/repository/log.repository';

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDataSource: LogDatasource) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog(log);
  }
  async getLog(severityLevel: LogseverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLog(severityLevel);
  }
}
