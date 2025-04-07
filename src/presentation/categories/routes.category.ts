import { Router } from 'express';
import { CategoryController } from './controller.category';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();
    const { createCategory, getCategory } = new CategoryController();

    router.get('/', getCategory);
    router.post('/', AuthMiddleware.validateJwt, createCategory);

    return router;
  }
}
