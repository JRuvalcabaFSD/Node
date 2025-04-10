import { url } from 'inspector';
import { envs } from '../../config';

export class DiscordService {
  private readonly discordWebHookUrl: string = envs.DISCORD_WEBHOOK_URL;
  constructor() {}

  async notify(message: string) {
    const body = {
      content: message,
      embeds: [
        {
          image: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzFhMDZvb3Q0bnJnY2cwdmI4czd2Y3luYTJ4cjhmZnZiNDR5dTB6YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/145oanYST4wYhi/giphy.gif' },
        },
      ],
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
