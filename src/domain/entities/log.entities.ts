export enum LogseverityLevel {
  low = 'low',
  medium = 'medium',
  hight = 'hight',
}

export class LogEntity {
  public level: LogseverityLevel;
  public message: string;
  public createAt: Date;

  constructor(message: string, level: LogseverityLevel) {
    this.message = message;
    this.level = level;
    this.createAt = new Date();
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createAt } = JSON.parse(json);
    const log = new LogEntity(message, level);
    log.createAt = new Date(createAt);

    return log;
  };
}
