import { envs } from '../../config';

export class DiscordService {
  private readonly discordWebHookUrl: string = envs.DISCORD_WEBHOOK_URL;
  constructor() {}

  async notify(message: string) {
    const body = {
      content: message,
    };

    const resp = await fetch(this.discordWebHookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!resp.ok) {
      console.error('Error sending message to discord');
      return false;
    }

    return true;
  }
}
