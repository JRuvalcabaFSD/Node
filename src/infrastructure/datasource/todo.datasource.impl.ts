import { prisma } from '../../data/postgres';
import { CreateDto, TodoDataSource, TodoEntity, UpdateDto } from '../../domain';

export class TodoDataSourceImpl implements TodoDataSource {
  async create(createDto: CreateDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({ data: createDto! });

    return TodoEntity.fromObj(todo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map(TodoEntity.fromObj);
  }

  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) throw `Todo width id ${id} not found`;
    return TodoEntity.fromObj(todo);
  }

  async updateById(updateDto: UpdateDto): Promise<TodoEntity> {
    await this.findById(updateDto.id);
    const updatedDto = await prisma.todo.update({ where: { id: updateDto.id }, data: updateDto!.values });

    return TodoEntity.fromObj(updatedDto);
  }
  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);
    const todo = await prisma.todo.delete({ where: { id } });
    return TodoEntity.fromObj(todo);
  }
}
