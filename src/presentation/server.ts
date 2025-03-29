import { CheckService } from '../domain/use-cases/checks/check.service';
import { SendEmailLogs } from '../domain/use-cases/email/send.email.log';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log-repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fyleSystemRepository = new LogRepositoryImpl(new FileSystemDatasource());
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Sever started...');

    // new SendEmailLogs(emailService, fyleSystemRepository).execute(['jruvalcabafsd@proton.me', 'jruvalcbafsd@icloud.com']);
    // const emailService = new EmailService(fyleSystemRepository);
    // emailService.sendEmailWithFileSystemLogs(['jruvalcabafsd@proton.me', 'jruvalcbafsd@icloud.com']);
    // const url = 'http://localhost:3000';
    // CronService.createJob('*/5 * * * * *', () => {
    //   new CheckService(fyleSystemRepository, undefined, undefined).execute(url);
    // });
  }
}
