import { envs } from './../../config/plugins/envs-plugins';
import { MongoDatabase } from '../../data/mongo/init';
import { connection } from 'mongoose';
import { MongoLogdataSource } from './mongo.datasource';
import { LogEntity, LogseverityLevel } from '../../domain/entities/log.entities';
import { LogModel } from '../../data/mongo';

describe('mongo.datasource', () => {
  const logDatasource = new MongoLogdataSource();
  const log = new LogEntity({ level: LogseverityLevel.low, message: 'Test message', origin: 'mongo.datasource.test.ts' });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany({});
  });

  afterAll(async () => {
    connection.close();
  });

  test('should create a log', async () => {
    const logSpy = jest.spyOn(console, 'log');
    await logDatasource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('Mongo log created: ', expect.any(String));
  });

  test('should get logs', async () => {
    await logDatasource.saveLog(log);
    const logs = await logDatasource.getLog(LogseverityLevel.low);
    expect(logs.length).toBe(1);
    expect(logs[0].level).toBe(LogseverityLevel.low);
  });
});
