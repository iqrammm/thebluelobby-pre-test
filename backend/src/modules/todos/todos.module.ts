import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/modules/todos/todo.entity';
import { TodosService } from 'src/modules/todos/todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
