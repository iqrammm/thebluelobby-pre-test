import List from "@mui/material/List";
import { memo, useEffect } from "react";
import TodoListItem from "components/todos/list/list-item";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTodos } from "services/todo.service";
import { useInView } from "react-intersection-observer";
import { useFilterStore } from "stores/todo-filter.store";
import { useTodoStore } from "stores/todo.store";
import ReactSwal from "components/todos/swal";
import { AxiosError } from "axios";

const TodoList = () => {
  const { status } = useFilterStore();
  const { todos, updateTodo } = useTodoStore();
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isSuccess } = useInfiniteQuery({
    queryKey: ["todos", status],
    queryFn: ({ pageParam = 1 }) => {
      return getTodos(5, pageParam, status);
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.meta?.hasNextPage ? lastPage.meta.page + 1 : undefined;
    },
    onError: (error: AxiosError) => {
      ReactSwal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok"
      });
    }
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (data) {
      updateTodo(data);
    }
  }, [data, updateTodo]);

  return (
    <List
      dense
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        height: "400px",
        overflow: "auto"
      }}
    >
      {isSuccess &&
        todos?.pages.map(({ data }) =>
          data.map((todo, i) => {
            if (data.length === i + 1) {
              return <TodoListItem ref={ref} todo={todo} key={todo.id} />;
            }
            return <TodoListItem todo={todo} key={todo.id} />;
          })
        )}
    </List>
  );
};

const MemoizedTodoList = memo(TodoList);
export default MemoizedTodoList;
