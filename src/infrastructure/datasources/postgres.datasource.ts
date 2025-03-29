import { PrismaClient, SeveroityLevel } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogseverityLevel } from '../../domain/entities/log.entities';
import { LogMapperForPosgress, LogMapperFromPosgress } from '../mappers/postgres.mapers';

const prismaClient = new PrismaClient();

export class PostGresLogDataSource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const { message, level, origin, createAt } = LogMapperForPosgress(log);
    await prismaClient.logModel.create({ data: { message, level, origin, createAt } });
  }
  async getLog(severityLevel: LogseverityLevel): Promise<LogEntity[]> {
    const prismaLogs = await prismaClient.logModel.findMany({ where: { level: severityLevel.toLocaleUpperCase() as SeveroityLevel } });
    return prismaLogs.map(LogMapperFromPosgress);
  }
}
