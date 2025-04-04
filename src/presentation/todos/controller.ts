import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { Prisma } from '@prisma/client';
import { CreateDto, UpdateDto } from '../../domain/dtos/todos';

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
    return;
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID argument is not a number' });
      return;
    }

    const todo = await prisma.todo.findUnique({ where: { id } });
    todo ? res.json(todo) : res.status(404).json({ error: `TODO with id ${id} not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, todoData] = CreateDto.create(req.body);
    if (error) res.status(error.httpCode).json({ error: error.message });

    const newTodo = await prisma.todo.create({ data: todoData! });

    res.json(newTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [err, dataTodo] = UpdateDto.create({ ...req.body, id });

    if (err) res.status(err.httpCode).json(err.message);

    try {
      const todo = await prisma.todo.update({ where: { id }, data: dataTodo!.values });
      res.json(todo);
      return;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        res.status(404).json({ error: `The todo with ID: ${id} could not be found` });
        return;
      }
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID argument is not a number' });
      return;
    }

    try {
      const todo = await prisma.todo.delete({ where: { id } });
      res.json({ msg: `The element was eliminated with the ID ${id} correctly`, todo });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        res.status(404).json({ error: `The todo with ID:$ {id} could not be found` });
        return;
      }
    }
  };
}
