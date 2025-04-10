import { Request, Response } from 'express';
import { existsSync } from 'fs';
import { resolve } from 'path';

export class ImageController {
  constructor() {}

  getImage = (req: Request, res: Response) => {
    const { type = '', image = '' } = req.params;

    const imagePath = resolve(__dirname, `../../../uploads/${type}/${image}`);

    if (!existsSync(imagePath)) {
      res.status(404).json({ error: 'Not found' });
      return;
    }

    res.sendFile(imagePath);
  };
}
