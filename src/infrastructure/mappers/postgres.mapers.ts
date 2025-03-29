import { LogModel, SeveroityLevel } from '@prisma/client';
import { LogEntity, LogseverityLevel } from '../../domain/entities/log.entities';

type PrismaLogEntity = Omit<LogEntity, 'level'> & { level: SeveroityLevel };

export const LogMapperForPosgress = (log: LogEntity): PrismaLogEntity => {
  const { level } = log;
  const newLevel = { ...log, level: level.toUpperCase() as SeveroityLevel };
  return newLevel;
};

export const LogMapperFromPosgress = (log: LogModel): LogEntity => {
  const { message, level: lv, origin, createAt } = log;
  return { message, level: lv.toLowerCase() as LogseverityLevel, origin, createAt };
};
