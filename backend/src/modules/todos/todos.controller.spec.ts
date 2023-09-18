import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from 'src/modules/todos/todos.service';
import { CreateTodoDto } from 'src/modules/todos/dtos/create-todo.dto';
import { TodoStatus } from 'src/modules/todos/todo.entity';
import { UpdateTodoDto } from 'src/modules/todos/dtos/update-todo.dto';

describe('TodosController', () => {
  let controller: TodosController;
  let fakeTodosService: Partial<TodosService>;

  const currentDate = new Date();

  beforeEach(async () => {
    fakeTodosService = {
      delete: (id) => Promise.resolve({ id }),
      create: jest.fn((dto) => {
        return Promise.resolve({
          id: 'uuid',
          updated_at: currentDate,
          created_at: currentDate,
          deleted_at: null,
          status: TodoStatus.PENDING,
          ...dto,
        });
      }),
      update: jest.fn((id, dto) => {
        return Promise.resolve({
          id,
          updated_at: currentDate,
          created_at: currentDate,
          deleted_at: null,
          status: TodoStatus.PENDING,
          ...dto,
        });
      }),
      updateStatus: jest.fn((id, status) => {
        return Promise.resolve({
          id,
          task: 'some task',
          description: 'some description',
          priority: 1,
          due_date: currentDate,
          updated_at: currentDate,
          created_at: currentDate,
          deleted_at: null,
          status: status,
        });
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: fakeTodosService,
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a todo', async () => {
    const todo: CreateTodoDto = {
      task: 'some task',
      description: 'some description',
      priority: 1,
      due_date: currentDate,
    };

    const res = await controller.create(todo);

    expect(res).toEqual({
      ...todo,
      id: expect.any(String),
      updated_at: expect.any(Date),
      created_at: expect.any(Date),
      deleted_at: null,
      status: TodoStatus.PENDING,
    });
  });

  it('should update a todo', async () => {
    const updatedTodo: UpdateTodoDto = {
      task: 'some task 2',
      description: 'some description 2',
      priority: 33,
      due_date: currentDate,
    };

    const res = await controller.update({ id: 'uuid' }, updatedTodo);

    expect(res).toEqual({
      ...updatedTodo,
      id: expect.any(String),
      updated_at: expect.any(Date),
      created_at: expect.any(Date),
      deleted_at: null,
      status: TodoStatus.PENDING,
    });
  });

  it('should delete a todo', async () => {
    const res = await controller.delete({ id: 'uuid' });

    expect(res).toEqual({ id: 'uuid' });
  });

  it('should update a todo status', async () => {
    const newStatus = TodoStatus.COMPLETED;

    const res = await controller.updateStatus(
      {
        id: 'uuid',
      },
      {
        status: newStatus,
      },
    );

    expect(res).toEqual({
      id: expect.any(String),
      task: expect.any(String),
      description: expect.any(String),
      priority: expect.any(Number),
      due_date: expect.any(Date),
      updated_at: expect.any(Date),
      created_at: expect.any(Date),
      deleted_at: null,
      status: newStatus,
    });
  });
});
