import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductController } from './products.controller';
import { ProductService } from '../services';

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const productService = new ProductService();
    const { getProducts, createProduct } = new ProductController(productService);

    router.get('/', getProducts);
    router.post('/', AuthMiddleware.validateJwt, createProduct);

    return router;
  }
}
