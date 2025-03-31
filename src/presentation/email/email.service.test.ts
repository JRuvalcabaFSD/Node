import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from './email.service';

describe('email.service', () => {
  const mockSendMail = jest.fn();
  nodemailer.createTransport = jest.fn().mockReturnValue({ sendMail: mockSendMail });
  const emailService = new EmailService();

  test('should send email', async () => {
    const options: SendMailOptions = {
      to: 'jesus@jrmdev.org',
      subject: 'test',
      htmlBody: '<h1>Test</h1>',
    };

    await emailService.sendEmail(options);
    expect(mockSendMail).toHaveBeenCalledWith({ attachments: expect.any(Array), html: '<h1>Test</h1>', subject: 'test', to: 'jesus@jrmdev.org' });
  });
  test('should send email eoth attachements', async () => {
    const email = 'jesus@jrmdev.org';
    await emailService.sendEmailWithFileSystemLogs(email);
    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: 'Logs del servidor',
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { fileName: 'logs-all.log', path: 'logs/logs-all.log' },
        { fileName: 'logs-hight.log', path: 'logs/logs-hight.log' },
        { fileName: 'logs-medium.log', path: 'logs/logs-medium.log' },
      ]),
    });
  });
});
