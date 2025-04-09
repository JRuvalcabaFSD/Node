import { Router } from 'express';
import { FileUploadController } from './fileUpload.controller';

export class FilesUploadRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new FileUploadController();

    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type', controller.uploadMultipleFiles);

    return router;
  }
}
