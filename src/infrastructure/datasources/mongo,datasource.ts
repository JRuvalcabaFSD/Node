import { LogModel } from '../../data/mongo';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogseverityLevel } from '../../domain/entities/log.entities';

export class MongoLogdataSource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log('mongo log created: ', newLog.id);
  }

  async getLog(severityLevel: LogseverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severityLevel });
    return logs.map(LogEntity.fromObject);
  }
}
