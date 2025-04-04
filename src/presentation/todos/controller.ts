import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { Prisma } from '@prisma/client';

const todos = [
  { id: 1, text: 'Buy milk', completedAt: new Date() },
  { id: 2, text: 'Buy bread', completedAt: null },
  { id: 3, text: 'Buy butter', completedAt: new Date() },
];
export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();

    res.json(todos);
    return;
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID argument is not a number' });
      return;
    }

    const todo = await prisma.todo.findUnique({ where: { id } });
    todo ? res.json(todo) : res.status(404).json({ error: `TODO with id ${id} not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: 'Text property is required' });
      return;
    }

    const newTodo = await prisma.todo.create({ data: { text } });

    res.json(newTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const { text, completedAt } = req.body;

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID argument is not a number' });
      return;
    }

    let data: { text?: string; completedAt?: Date | null } = {};
    if (text) data.text = text;
    if (completedAt) data.completedAt = completedAt === 'null' ? null : new Date(completedAt);

    try {
      const todo = await prisma.todo.update({ where: { id }, data });
      res.json(todo);
      return;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        res.status(404).json({ error: `The todo with ID:$ {id} could not be found` });
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
