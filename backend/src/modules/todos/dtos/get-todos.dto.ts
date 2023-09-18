import { IsEnum, IsOptional } from 'class-validator';
import { TodoStatus } from 'src/modules/todos/todo.entity';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';

export class GetTodosDto extends PageOptionsDto {
  @IsOptional()
  @IsEnum(TodoStatus)
  status: string;
}
