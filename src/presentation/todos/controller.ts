import { Request, Response } from 'express';
import { CreateDto, CreateTodo, CustomError, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateDto, UpdateTodo } from '../../domain';

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  private handleError = (resp: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return resp.status(error.statusCode).json({ error: error.message });
    }

    return resp.status(500).json({ error: 'Internal server error - check logs' });
  };

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => res.status(400).json({ error }));
  };

  public getTodoById = (req: Request, res: Response) => {
    const id: number = +req.params.id;
    new GetTodo(this.todoRepository)
      .execute(id)
      .then((todos) => res.json(todos))
      .catch((error) => this.handleError(res, error));
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, todoData] = CreateDto.create(req.body);
    if (error) {
      res.status(error.httpCode).json({ error: error.message });
      return;
    }

    new CreateTodo(this.todoRepository)
      .execute(todoData!)
      .then((todos) => res.status(201).json(todos))
      .catch((error) => this.handleError(res, error));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [err, dataTodo] = UpdateDto.create({ ...req.body, id });

    if (err) {
      res.status(err.httpCode).json(err.message);
      return;
    }

    new UpdateTodo(this.todoRepository)
      .execute(dataTodo!)
      .then((todos) => res.json(todos))
      .catch((error) => this.handleError(res, error));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todos) => res.json(todos))
      .catch((error) => this.handleError(res, error));
  };
}
