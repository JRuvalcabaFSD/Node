import { createTransport } from 'nodemailer';
import { envs } from '../../config/plugins/envs-plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogseverityLevel } from '../../domain/entities/log.entities';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  fileName: string;
  path: string;
}

//TODO Attachement

export class EmailService {
  private transporter = createTransport({
    host: envs.MAILER_SERVICE,
    port: 465,
    secure: true,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  constructor(private readonly logRepository: LogRepository) {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sendInformation = await this.transporter.sendMail({ to, subject, html: htmlBody, attachments });
      const log = new LogEntity({ level: LogseverityLevel.low, message: `Email send`, origin: 'email.service.ts' });
      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({ level: LogseverityLevel.hight, message: `Email was not send`, origin: 'email.service.ts' });
      this.logRepository.saveLog(log);
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Logs del servidor';
    const htmlBody = `
        <h3>Logs de sistema - NOC</h3>
        <P>Qui adipisicing consectetur consequat non commodo incididunt.</p>
        <P>Ver Log adjuntos</p>
      `;
    const attachments: Attachment[] = [
      { fileName: 'logs-all.log', path: 'logs/logs-all.log' },
      { fileName: 'logs-hight.log', path: 'logs/logs-hight.log' },
      { fileName: 'logs-medium.log', path: 'logs/logs-medium.log' },
    ];

    this.sendEmail({ to, subject, attachments, htmlBody });
  }
}
