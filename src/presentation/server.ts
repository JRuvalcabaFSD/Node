import { CheckService } from '../domain/use-cases/checks/check.service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log-repository.impl';
import { CronService } from './cron/cron-service';

const fyleSystemRepository = new LogRepositoryImpl(new FileSystemDatasource());

export class Server {
  public static start() {
    console.log('Sever started...');
    const url = 'https://localhost:3000';
    CronService.createJob('*/5 * * * * *', () => {
      new CheckService(fyleSystemRepository, undefined, undefined).execute(url);
    });
  }
}
