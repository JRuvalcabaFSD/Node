import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';
import { UpdateDto } from '../../dtos/todos';

export interface updateTodoUseCase {
  execute(dto: UpdateDto): Promise<TodoEntity>;
}

export class UpdateTodo implements updateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}
  execute(dto: UpdateDto): Promise<TodoEntity> {
    return this.repository.updateById(dto);
  }
}
