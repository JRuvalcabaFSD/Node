import { CreateDto, TodoDataSource, TodoEntity, UpdateDto } from '../../domain';
import { TodoDataSourceImpl } from '../datasource/todo.datasource.impl';

export class TodoRepositoryImpl implements TodoDataSourceImpl {
  constructor(private readonly datasource: TodoDataSource) {}
  create(createDto: CreateDto): Promise<TodoEntity> {
    return this.datasource.create(createDto);
  }
  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }
  findById(id: number): Promise<TodoEntity> {
    return this.datasource.findById(id);
  }
  updateById(updateDto: UpdateDto): Promise<TodoEntity> {
    return this.datasource.updateById(updateDto);
  }
  deleteById(id: number): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }
}
