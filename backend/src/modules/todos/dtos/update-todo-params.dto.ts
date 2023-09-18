import { IsUUID } from 'class-validator';

export class UpdateTodoParamsDto {
  @IsUUID()
  id: string;
}
