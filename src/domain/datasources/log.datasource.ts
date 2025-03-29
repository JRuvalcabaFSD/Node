import { LogEntity, LogseverityLevel } from '../entities/log.entities';

export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLog(severityLevel: LogseverityLevel): Promise<LogEntity[]>;
}
