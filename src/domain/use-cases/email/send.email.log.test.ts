import { LogEntity, LogseverityLevel } from '../../entities/log.entities';
import { SendEmailLogs } from './send.email.log';

describe('send.email', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockEmailService = { sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true) };
  const mockRepository = { saveLog: jest.fn(), getLog: jest.fn() };

  const sendEmail = new SendEmailLogs(mockEmailService as any, mockRepository);

  test('should senemail was implemented and sent an email correctly.', async () => {
    const result = await sendEmail.execute('jesus@jrmdev.org');

    expect(result).toBeTruthy();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveReturnedTimes(1);
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository.saveLog).toHaveBeenCalledWith({
      createAt: expect.any(Date),
      level: LogseverityLevel.low,
      message: 'Log email send',
      origin: 'send.email.log.ts',
    });
  });

  test('should senemail was implemented and sent an email in case on error.', async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);
    const result = await sendEmail.execute('jesus@jrmdev.org');

    expect(result).toBeFalsy();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveReturnedTimes(1);
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository.saveLog).toHaveBeenCalledWith({
      createAt: expect.any(Date),
      level: LogseverityLevel.hight,
      message: 'Error: Email log was not send',
      origin: 'send.email.log.ts',
    });
  });
});
