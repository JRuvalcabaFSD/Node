import { prisma } from '../../data/postgres';
import { CreateDto, TodoDataSource, TodoEntity, UpdateDto } from '../../domain';

export class TodoDataSourceImpl implements TodoDataSource {
  create(createDto: CreateDto): Promise<TodoEntity> {
    throw new Error('Method not implemented.');
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map(TodoEntity.fromObj);
  }
  findById(id: number): Promise<TodoEntity> {
    throw new Error('Method not implemented.');
  }
  updateById(updateDto: UpdateDto): Promise<TodoEntity> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: number): Promise<TodoEntity> {
    throw new Error('Method not implemented.');
  }
}
