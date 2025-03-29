import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, LogseverityLevel } from '../../entities/log.entities';
import { LogRepository } from '../../repository/log.repository';

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emaiService: EmailService,
    private readonly logRepositori: LogRepository,
  ) {}
  async execute(to: string | string[]) {
    try {
      const send = await this.emaiService.sendEmailWithFileSystemLogs(to);
      if (!send) throw new Error('Email log was not send');
      const log = new LogEntity({ message: 'Log email send', level: LogseverityLevel.low, origin: 'send.email.log.ts' });
      this.logRepositori.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({ message: `${error}`, level: LogseverityLevel.hight, origin: 'send.email.log.ts' });
      this.logRepositori.saveLog(log);
      return false;
    }
  }
}
