import { LogseverityLevel } from '../domain/entities/log.entities';
import { CheckService } from '../domain/use-cases/checks/check.service';
import { SendEmailLogs } from '../domain/use-cases/email/send.email.log';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogdataSource } from '../infrastructure/datasources/mongo,datasource';
import { PostGresLogDataSource } from '../infrastructure/datasources/postgres.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log-repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const logRepository = new LogRepositoryImpl(
  new PostGresLogDataSource(),
  // new FileSystemDatasource(),
  // new MongoLogdataSource()
);
// const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log('Sever started...');

    // new SendEmailLogs(emailService, fyleSystemRepository).execute(['jruvalcabafsd@proton.me', 'jruvalcbafsd@icloud.com']);
    // const emailService = new EmailService(fyleSystemRepository);
    // emailService.sendEmailWithFileSystemLogs(['jruvalcabafsd@proton.me', 'jruvalcbafsd@icloud.com']);
    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com';
    //   new CheckService(logRepository, undefined, undefined).execute(url);
    // });
    const logs = await logRepository.getLog(LogseverityLevel.medium);
    console.log(logs);
  }
}
