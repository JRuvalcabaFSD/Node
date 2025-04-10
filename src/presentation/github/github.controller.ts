import { Request, Response } from 'express';

export class GithubController {
  constructor() {}

  webHookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header('x-github-event') ?? 'unknown';
    const signature = req.header('x-hub-signature-256') ?? 'unknown';
    const payload = req.body;

    res.status(202).send('Accepted');
  };
}
