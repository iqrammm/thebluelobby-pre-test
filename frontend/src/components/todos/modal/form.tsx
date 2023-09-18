import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { infer as Infer, number, object, string, instanceof as instanceof_ } from "zod";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import TaskIcon from "@mui/icons-material/Task";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CreateTodoInput, Todo } from "types/todo";
import { FormMode } from "types";
import { FC, useMemo } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, updateTodo } from "services/todo.service";
import { AxiosError } from "axios";
import ReactSwal from "components/todos/swal";

const createTodoSchema = object({
  task: string().min(3).max(50),
  description: string().min(3).max(255),
  priority: number().min(1).max(100),
  due_date: instanceof_(dayjs as unknown as typeof Dayjs)
});
type TodoSchemaType = Infer<typeof createTodoSchema>;

interface TodoFormProps {
  todo: Partial<Todo>;
  mode: FormMode;
  setModalOpen: (open: boolean) => void;
}

const TodoForm: FC<TodoFormProps> = ({ todo, mode, setModalOpen }) => {
  const isEditMode = useMemo(() => mode === FormMode.UPDATE, [mode]);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TodoSchemaType>({
    mode: "onChange",
    resolver: zodResolver(createTodoSchema)
  });

  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["todos"],
    mutationFn: (body: CreateTodoInput) =>
      mode === FormMode.CREATE ? createTodo(body) : updateTodo(body, todo.id),
    onSuccess: () => {
      ReactSwal.fire({
        title: "Success!",
        text: `Todo ${mode === FormMode.CREATE ? "created" : "updated"} successfully`,
        icon: "success",
        timer: 1000
      });
      client.invalidateQueries(["todos"]);
      setModalOpen(false);
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

  const onSubmit = (data: TodoSchemaType) => {
    mutate({ ...data, due_date: data.due_date.toDate() });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <TaskIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New Task
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 1 }}>
          <Controller
            name="task"
            control={control}
            defaultValue={isEditMode ? todo.task : ""}
            render={({ field: { ref, ...field } }) => (
              <TextField
                label="Task Name"
                variant="outlined"
                sx={{
                  mb: 2
                }}
                error={Boolean(errors.task)}
                helperText={errors.task?.message}
                fullWidth
                inputRef={ref}
                {...field}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue={isEditMode ? todo.description : ""}
            render={({ field: { ref, ...field } }) => (
              <TextField
                label="Task Description"
                variant="outlined"
                multiline
                fullWidth
                rows={4}
                sx={{ mb: 1 }}
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
                inputRef={ref}
                {...field}
              />
            )}
          />

          <Controller
            name="priority"
            control={control}
            defaultValue={isEditMode ? todo.priority : 100}
            render={({ field: { ref, ...field } }) => (
              <TextField
                variant="outlined"
                type="number"
                fullWidth
                sx={{ mb: 1 }}
                error={Boolean(errors.priority)}
                helperText={errors.priority?.message}
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Controller
            name="due_date"
            control={control}
            defaultValue={todo?.due_date ? dayjs(todo.due_date) : dayjs().add(1, "day")}
            render={({ field: { ref, ...field } }) => (
              <DatePicker label="Due Date" sx={{ mb: 1, width: "100%" }} ref={ref} {...field} />
            )}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {mode === FormMode.CREATE ? "Add" : "Update"} Task
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default TodoForm;
