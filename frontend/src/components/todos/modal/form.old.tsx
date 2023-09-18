import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import TaskIcon from "@mui/icons-material/Task";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FC, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, updateTodo } from "services/todo.service";
import { CreateTodoInput, Todo } from "types/todo";
import { FormMode } from "types";

interface CreateTodoFormProps {
  todo: Partial<Todo>;
  mode: FormMode;
  setModalOpen: (open: boolean) => void;
}

const CreateTodoForm: FC<CreateTodoFormProps> = ({ todo, mode, setModalOpen }) => {
  const client = useQueryClient();
  const [dueDate, setDueDate] = useState<Dayjs | null>(
    todo?.due_date ? dayjs(todo.due_date) : dayjs().add(1, "day")
  );
  const [priority, setPriority] = useState<number>(todo?.priority || 100);
  const [task, setTask] = useState<string>(todo?.task || "");
  const [description, setDescription] = useState<string>(todo?.description || "");

  const { mutate: addOrUpdate } = useMutation({
    mutationKey: ["todos"],
    mutationFn: (body: CreateTodoInput) =>
      mode === FormMode.CREATE ? createTodo(body) : updateTodo(body, todo.id),
    onSuccess: () => {
      client.invalidateQueries(["todos"]);
      setModalOpen(false);
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addOrUpdate({
      task: task,
      description: description,
      priority: priority,
      due_date: dueDate?.toDate() || new Date()
    });
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            value={task}
            onChange={(e) => setTask(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="task"
            label="Task Name"
            name="task"
            autoComplete="task"
            autoFocus
          />
          <TextField
            value={description}
            onChange={(e) => {
              console.log(e.target.value);

              setDescription(e.target.value);
            }}
            label="Task Description"
            id="description"
            name="description"
            multiline
            fullWidth
            rows={4}
          />
          <TextField
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value))}
            id="priority"
            name="priority"
            label="Task Priority"
            type="number"
            fullWidth
            sx={{ mt: 1 }}
          />
          <DatePicker
            label="Due Date"
            onChange={(newValue) => setDueDate(newValue)}
            value={dueDate}
            sx={{ mt: 1, width: "100%" }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {mode === FormMode.CREATE ? "Add" : "Update"} Task
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateTodoForm;
