import { Router } from 'express';
import { AuthRoutes } from './auth/routes.auth';
import { CategoryRoutes } from './categoryes/routes.category';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/category', CategoryRoutes.routes);

    return router;
  }
}
