import {
  Checkbox,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { Ref, forwardRef, memo, useState } from "react";
import { Todo, TodoStatus } from "types/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, updateTodoStatus } from "services/todo.service";
import CreateTodoModal from "components/todos/modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { FormMode } from "types";

interface TodoListItemProps {
  todo: Todo;
}

const TodoListItem = ({ todo }: TodoListItemProps, ref: Ref<HTMLLIElement>) => {
  const client = useQueryClient();
  const [checked, setChecked] = useState<boolean>(todo.status === TodoStatus.COMPLETED);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const { mutate: updateTodoStatusMutation } = useMutation({
    mutationKey: ["todo", todo.id],
    mutationFn: (checkVariable: boolean) =>
      updateTodoStatus(todo.id, checkVariable ? TodoStatus.COMPLETED : TodoStatus.PENDING),
    onSuccess: () => {
      client.invalidateQueries(["todos"]);
    }
  });

  const { mutate: deleteTodoMutation } = useMutation({
    mutationKey: ["todo", todo.id],
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      client.invalidateQueries(["todos"]);
    }
  });

  return (
    <>
      <ListItem disablePadding ref={ref ? ref : null}>
        <ListItemButton dense>
          <ListItemAvatar>{checked ? <CheckIcon /> : <PendingActionsIcon />}</ListItemAvatar>
          <ListItemText id={todo.id} primary={todo.task} />
          <Stack direction="row-reverse" alignItems="center" justifyContent="flex-end">
            <Checkbox
              edge="end"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                updateTodoStatusMutation(event.target.checked);
                setChecked(event.target.checked);
              }}
              checked={checked}
              inputProps={{ "aria-labelledby": todo.task }}
            />
            <EditIcon onClick={() => setOpenEditModal(true)} />
            <DeleteForeverIcon onClick={() => deleteTodoMutation()} />
          </Stack>
        </ListItemButton>
      </ListItem>
      <CreateTodoModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        todo={todo}
        mode={FormMode.UPDATE}
      />
    </>
  );
};

const MemoizedTodoListItem = memo(forwardRef(TodoListItem));

export default MemoizedTodoListItem;
