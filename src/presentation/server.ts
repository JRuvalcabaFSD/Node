import { CheckService } from '../domain/use-cases/checks/check.service';
import { CronService } from './cron/cron-service';

export class Server {
  public static start() {
    console.log('Sever started...');
    const url = 'https://google.com';
    CronService.createJob('*/5 * * * * *', () => {
      new CheckService(() => console.log(`${url} is ok`), console.log).execute(url);
    });
  }
}
