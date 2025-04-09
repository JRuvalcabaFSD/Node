import { Request, Response } from 'express';
import { CustomError } from '../../domain';

export class FileUploadController {
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
  };

  uploadFile = async (req: Request, res: Response) => {
    res.json('Upload file');
  };

  uploadMultipleFiles = async (req: Request, res: Response) => {
    res.json('Upload multiple files');
  };
}
