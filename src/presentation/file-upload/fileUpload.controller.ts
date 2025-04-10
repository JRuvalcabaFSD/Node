import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { FileUploadService } from '../services';
import { UploadedFile } from 'express-fileupload';

export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  private handleError = (error: unknown, res: Response) => {
    console.log(error);

    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
  };

  uploadFile = async (req: Request, res: Response) => {
    const { type } = req.params;
    const validTypes = ['users', 'categories', 'product'];
    if (!validTypes.includes(type)) {
      res.status(400).json({ error: `Invalid type ${type}, valid ones ${validTypes}` });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({ error: 'No files were selected' });
      return;
    }
    const file = req.files.file as UploadedFile;
    this.fileUploadService
      .uploadSimple(file, `Uploads/${type}`)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => this.handleError(error, res));
  };

  uploadMultipleFiles = async (req: Request, res: Response) => {
    res.json('Upload multiple files');
  };
}
