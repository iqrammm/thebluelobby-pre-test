import { TodoStatus } from "types/todo";
import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";

type TodoFilterState = {
  status: TodoStatus | null;
  updateStatusFilter: (status: TodoStatus | null) => void;
};

const hashStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    const storedValue = searchParams.get(key) ?? "";
    return JSON.parse(storedValue);
  },
  setItem: (key, newValue): void => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    searchParams.set(key, JSON.stringify(newValue));
    window.location.hash = searchParams.toString();
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    searchParams.delete(key);
    window.location.hash = searchParams.toString();
  }
};

export const useFilterStore = create<TodoFilterState>()(
  persist(
    (set) => ({
      status: null,
      updateStatusFilter: (status) => set({ status })
    }),
    {
      name: "todo-filters",
      storage: createJSONStorage(() => hashStorage)
    }
  )
);
