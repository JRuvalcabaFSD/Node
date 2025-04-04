import { Router } from 'express';
import { TodosController } from './controller';

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todoController = new TodosController();

    router.get('/', todoController.getTodos);
    router.get('/:id', todoController.getTodoById);
    router.put('/:id', todoController.updateTodo);
    router.post('/', todoController.createTodo);
    router.delete('/:id', todoController.deleteTodo);

    return router;
  }
}
