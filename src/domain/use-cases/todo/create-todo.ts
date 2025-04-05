import { TodoEntity } from '../../entities/todo.entity';
import { CreateDto } from '../../dtos/todos/create.dto';
import { TodoRepository } from '../../repositories/todo.repository';

export interface CreateTodoUseCase {
  execute(dto: CreateDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}
  execute(dto: CreateDto): Promise<TodoEntity> {
    return this.repository.create(dto);
  }
}
