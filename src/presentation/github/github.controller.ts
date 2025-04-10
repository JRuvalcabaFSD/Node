import { Request, Response } from 'express';

export class GithubController {
  constructor() {}

  webHookHandler = (req: Request, res: Response) => {
    console.log('Endpoint llamado');

    res.json('Hecho');
  };
}
