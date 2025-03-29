import { CronJob } from 'cron';

type CronTime = string | Date;
type OnTicik = () => void;

export class CronService {
  static createJob(cronTime: CronTime, ontick: OnTicik): CronJob {
    const job = new CronJob(cronTime, ontick);
    job.start();
    return job;
  }
}
