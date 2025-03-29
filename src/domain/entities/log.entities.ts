export enum LogseverityLevel {
  low = 'low',
  medium = 'medium',
  hight = 'hight',
}

export interface LogEntitieOptions {
  level: LogseverityLevel;
  message: string;
  origin: string;
  createAt?: Date;
}

export class LogEntity {
  public level: LogseverityLevel;
  public message: string;
  public createAt: Date;
  public origin: string;

  constructor(options: LogEntitieOptions) {
    const { level, message, origin, createAt = new Date() } = options;
    this.message = message;
    this.level = level;
    this.createAt = createAt;
    this.origin = origin;
  }

  static fromJson = (json: string): LogEntity => {
    json = json === '' ? '{}' : json;
    const { message, level, createAt, origin } = JSON.parse(json);
    const log = new LogEntity({ message, level, createAt, origin });
    log.createAt = new Date(createAt);

    return log;
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createAt, origin } = object;
    return new LogEntity({ message, level, createAt, origin });
  };
}
