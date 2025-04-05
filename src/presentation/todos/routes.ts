import { Router } from 'express';
import { TodosController } from './controller';
import { TodoDataSourceImpl } from '../../infrastructure/datasource/todo.datasource.impl';
import { TodoRepositoryImpl } from '../../infrastructure/respositories/todo.repository.impl';

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const postgresDataSource = new TodoDataSourceImpl();
    const todoRepository = new TodoRepositoryImpl(postgresDataSource);

    const todoController = new TodosController(todoRepository);

    router.get('/', todoController.getTodos);
    router.get('/:id', todoController.getTodoById);
    router.put('/:id', todoController.updateTodo);
    router.post('/', todoController.createTodo);
    router.delete('/:id', todoController.deleteTodo);

    return router;
  }
}
