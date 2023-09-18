import { Type } from 'class-transformer';
import {
  MaxLength,
  IsString,
  MinLength,
  IsNumber,
  Max,
  Min,
  IsDateString,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  task: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  description: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  priority: number;

  @IsDateString()
  due_date: Date;
}
