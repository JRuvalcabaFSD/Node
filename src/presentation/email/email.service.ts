import { createTransport } from 'nodemailer';
import { envs } from '../../config/plugins/envs-plugins';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  fileName: string;
  path: string;
}

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

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sendInformation = await this.transporter.sendMail({ to, subject, html: htmlBody, attachments });
      return true;
    } catch (error) {
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

    return this.sendEmail({ to, subject, attachments, htmlBody });
  }
}
