import { CreateDto, UpdateDto } from '../dtos/todos';
import { TodoEntity } from '../entities/todo.entity';

export abstract class TodoRepository {
  abstract create(createDto: CreateDto): Promise<TodoEntity>;

  //todo: pagination
  abstract getAll(): Promise<TodoEntity[]>;
  abstract findById(id: number): Promise<TodoEntity>;
  abstract updateById(updateDto: UpdateDto): Promise<TodoEntity>;
  abstract deleteById(id: number): Promise<TodoEntity>;
}
