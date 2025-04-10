import { Router } from 'express';
import { ImageController } from './images.controller';

export class ImagesRoutes {
  static get routes(): Router {
    const router = Router();
    const { getImage } = new ImageController();

    router.get('/:type/:image', getImage);
    return router;
  }
}
