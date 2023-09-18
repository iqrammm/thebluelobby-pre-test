import { IsEnum } from 'class-validator';
import { TodoStatus } from 'src/modules/todos/todo.entity';

export class UpdateTodoStatusDto {
  @IsEnum(TodoStatus)
  status: TodoStatus;
}
