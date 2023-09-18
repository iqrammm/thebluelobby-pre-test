import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from 'src/modules/todos/dtos/create-todo.dto';
import { GetTodosDto } from 'src/modules/todos/dtos/get-todos.dto';
import { UpdateTodoParamsDto } from 'src/modules/todos/dtos/update-todo-params.dto';
import { UpdateTodoStatusDto } from 'src/modules/todos/dtos/update-todo-status.dto';
import { UpdateTodoDto } from 'src/modules/todos/dtos/update-todo.dto';
import { TodosService } from 'src/modules/todos/todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getTodos(@Query() query: GetTodosDto) {
    return this.todosService.findAll(query);
  }

  @Post()
  create(@Body() body: CreateTodoDto) {
    return this.todosService.create(body);
  }

  @Patch('/:id')
  update(@Param() params: UpdateTodoParamsDto, @Body() body: UpdateTodoDto) {
    return this.todosService.update(params.id, body);
  }

  @Patch('/status/:id')
  updateStatus(
    @Param() params: UpdateTodoParamsDto,
    @Body() body: UpdateTodoStatusDto,
  ) {
    return this.todosService.updateStatus(params.id, body.status);
  }

  @Delete('/:id')
  delete(@Param() params: UpdateTodoParamsDto) {
    return this.todosService.delete(params.id);
  }
}
