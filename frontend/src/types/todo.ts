export enum TodoStatus {
  PENDING = "pending",
  COMPLETED = "completed"
}

export interface ApiResponseTodoList {
  data: Todo[];
  meta: Meta;
}

export type Todo = {
  id: string;
  task: string;
  status: string;
  description: string;
  priority: number;
  due_date: Date;
};

export interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type CreateTodoInput = {
  task: string;
  description: string;
  priority: number;
  due_date: Date;
};
