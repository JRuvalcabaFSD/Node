import { PrismaClient, SeveroityLevel } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogseverityLevel } from '../../domain/entities/log.entities';

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeveroityLevel.LOW,
  medium: SeveroityLevel.MEDIUM,
  hight: SeveroityLevel.HIGHT,
};

export class PostGresLogDataSource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];
    await prismaClient.logModel.create({ data: { ...log, level } });
  }
  async getLog(severityLevel: LogseverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];
    const dbLog = await prismaClient.logModel.findMany({ where: { level } });
    return dbLog.map(LogEntity.fromObject);
  }
}
