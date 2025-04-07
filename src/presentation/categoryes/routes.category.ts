import { Router } from 'express';
import { CategoryController } from './controller.category';

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();
    const { createCategory, getCategory } = new CategoryController();

    router.get('/', getCategory);
    router.post('/', createCategory);

    return router;
  }
}
