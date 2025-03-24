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
}
