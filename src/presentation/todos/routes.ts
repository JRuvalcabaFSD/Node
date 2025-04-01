import { Router } from 'express';
import { TodosControler } from './controller';

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todoController = new TodosControler();

    router.get('/', todoController.getTodos);
    router.get('/:id', todoController.getTodoById);

    return router;
  }
}
