import { Request, Response } from 'express';
import { CreateDto, TodoRepository, UpdateDto } from '../../domain';
import { prisma } from '../../data/postgres';
import { Prisma } from '@prisma/client';

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    console.log(todos);

    res.json(todos);
    return;
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id: number = +req.params.id;

    try {
      const todo = await this.todoRepository.findById(id);
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, todoData] = CreateDto.create(req.body);
    if (error) res.status(error.httpCode).json({ error: error.message });

    const todo = await this.todoRepository.create(todoData!);

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [err, dataTodo] = UpdateDto.create({ ...req.body, id });

    if (err) res.status(err.httpCode).json(err.message);

    try {
      const todo = await this.todoRepository.updateById(dataTodo!);
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const todo = await this.todoRepository.deleteById(id);
      res.json({ msg: `The element was eliminated with the ID ${id} correctly`, todo });
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}
