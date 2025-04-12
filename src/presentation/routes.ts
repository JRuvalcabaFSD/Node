import { Router } from 'express';
import { TicketsRoutes } from './tickets/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/ticket', TicketsRoutes.routes);

    return router;
  }
}
