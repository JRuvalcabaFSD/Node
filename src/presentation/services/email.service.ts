import { createTransport, Transporter } from 'nodemailer';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

export interface Attachments {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter: Transporter;

  constructor(
    private readonly MAILER_SERVICE: string,
    private readonly MAILER_EMAIL: string,
    private readonly MAILER_SECRET_KEY: string,
  ) {
    this.transporter = createTransport({
      service: this.MAILER_SERVICE,
      auth: {
        user: this.MAILER_EMAIL,
        pass: this.MAILER_SECRET_KEY,
      },
    });
  }

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sendInformation = await this.transporter.sendMail({ to, subject, html: htmlBody, attachments });
      return true;
    } catch (error) {
      return false;
    }
  }
}
