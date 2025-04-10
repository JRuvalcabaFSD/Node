import { Router } from 'express';
import { FileUploadController } from './fileUpload.controller';
import { FileUploadService } from '../services';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';

export class FilesUploadRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new FileUploadController(new FileUploadService());

    router.use([FileUploadMiddleware.containFiles, TypeMiddleware.validTypes(['users', 'categories', 'products'])]);

    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type', controller.uploadMultipleFiles);

    return router;
  }
}
