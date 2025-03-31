import { CheckServiceMultiple } from '../domain/use-cases/checks/check.multiple.service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogdataSource } from '../infrastructure/datasources/mongo.datasource';
import { PostGresLogDataSource } from '../infrastructure/datasources/postgres.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log-repository.impl';
import { CronService } from './cron/cron-service';

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoSystemRepository = new LogRepositoryImpl(new MongoLogdataSource());
const postgresSystemRepository = new LogRepositoryImpl(new PostGresLogDataSource());

export class Server {
  public static async start() {
    console.log('Sever started...');
    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://godddogle.com';
    //   new CheckServiceMultiple([fileSystemRepository, mongoSystemRepository, postgresSystemRepository], undefined, undefined).execute(url);
    // });
  }
}
