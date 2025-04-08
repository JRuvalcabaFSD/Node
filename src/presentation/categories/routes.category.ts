import { Router } from 'express';
import { CategoryController } from './controller.category';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategoryService } from '../services/category.service';

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();
    const categoryService = new CategoryService();
    const { createCategory, getCategory } = new CategoryController(categoryService);

    router.get('/', getCategory);
    router.post('/', AuthMiddleware.validateJwt, createCategory);

    return router;
  }
}
