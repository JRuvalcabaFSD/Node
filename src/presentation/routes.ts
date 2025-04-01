import { Router } from 'express';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.get('/api/todos', (req, res) => {
      res.json([
        { id: 1, text: 'Buy milk', createdAt: new Date() },
        { id: 2, text: 'Buy bread', createdAt: null },
        { id: 3, text: 'Buy butter', createdAt: new Date() },
      ]);
    });

    return router;
  }
}
