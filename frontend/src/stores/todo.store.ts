import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ApiResponseTodoList } from "types/todo";

type ReactQueryInfiniteScrollData = {
  pages: ApiResponseTodoList[];
};

interface TodoListState {
  todos: ReactQueryInfiniteScrollData;
  updateTodo: (newData: ReactQueryInfiniteScrollData) => void;
}

export const useTodoStore = create<TodoListState>()(
  persist(
    (set) => ({
      todos: { pages: [] },
      updateTodo: (newData) => set({ todos: newData })
    }),
    { name: "todos" }
  )
);
