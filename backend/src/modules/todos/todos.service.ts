import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { CreateTodoDto } from 'src/modules/todos/dtos/create-todo.dto';
import { GetTodosDto } from 'src/modules/todos/dtos/get-todos.dto';
import { UpdateTodoDto } from 'src/modules/todos/dtos/update-todo.dto';
import { Todo, TodoStatus } from 'src/modules/todos/todo.entity';
import { Repository } from 'typeorm';
import { PageDto } from 'src/common/dtos/page.dto';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

  parseQuery(query: GetTodosDto) {
    const qb = this.repo.createQueryBuilder('todo');

    qb.select([
      'todo.id',
      'todo.task',
      'todo.description',
      'todo.status',
      'todo.priority',
      'todo.due_date',
    ]);

    if (query.status) {
      qb.andWhere('todo.status = :status', { status: query.status });
    }

    qb.orderBy('created_at', query.order);
    qb.skip(query.skip);
    qb.take(query.take);

    return qb;
  }

  async findAll(query: GetTodosDto) {
    const qb = this.parseQuery(query);
    const itemCount = await qb.getCount();
    const { entities } = await qb.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: query,
    });

    return new PageDto(entities, pageMetaDto);
  }

  create(data: CreateTodoDto) {
    const todo = this.repo.create({
      ...data,
      status: TodoStatus.PENDING,
    });

    return this.repo.save(todo);
  }

  async update(id: string, data: UpdateTodoDto) {
    const todo = await this.repo.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException();
    }

    Object.assign(todo, data);

    return this.repo.save(todo);
  }

  async updateStatus(id: string, status: TodoStatus) {
    const todo = await this.repo.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException();
    }

    todo.status = status;

    return this.repo.save(todo);
  }

  async delete(id: string) {
    const deleteResponse = await this.repo.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(id);
    }

    return { id: id };
  }
}
