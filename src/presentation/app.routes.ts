import { Router } from 'express';
import { AuthRoutes } from './auth/routes.auth';
import { CategoryRoutes } from './categories/category.routes';
import { ProductRoutes } from './products/products.routes';
import { FilesUploadRoutes } from './file-upload/fileUpload.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/category', CategoryRoutes.routes);
    router.use('/api/product', ProductRoutes.routes);
    router.use('/api/upload', FilesUploadRoutes.routes);

    return router;
  }
}
