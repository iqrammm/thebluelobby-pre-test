import { Box, Button, Chip, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FC, memo, useState } from "react";
import { useFilterStore } from "stores/todo-filter.store";
import { TodoStatus } from "types/todo";
import CreateTodoModal from "components/todos/modal";
import { FormMode } from "types";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

type status = {
  value: TodoStatus | null;
  label: string;
  color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  icon: JSX.Element;
};

const statuses: status[] = [
  {
    value: null,
    label: "All",
    color: "primary",
    icon: <></>
  },
  {
    value: TodoStatus.PENDING,
    label: "Pending",
    color: "warning",
    icon: <PendingActionsIcon />
  },
  {
    value: TodoStatus.COMPLETED,
    label: "Completed",
    color: "success",
    icon: <TaskAltIcon />
  }
];

const TodoFilterStrip: FC = () => {
  const { status, updateStatusFilter } = useFilterStore();
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        marginY: 2,
        marginX: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
        <Stack direction="row" spacing={2}>
          {statuses.map(({ value, label, color, icon }) => (
            <Chip
              icon={icon}
              size="small"
              key={label}
              label={label}
              color={color}
              sx={{ width: "auto" }}
              variant={status === value ? "filled" : "outlined"}
              onClick={() => updateStatusFilter(value)}
            />
          ))}
        </Stack>
      </Box>
      <Button onClick={() => setOpen(true)}>
        <AddCircleOutlineIcon />
      </Button>
      {<CreateTodoModal open={open} setOpen={setOpen} todo={{}} mode={FormMode.CREATE} />}
    </Box>
  );
};

const MemoizedTodoFilterStrip = memo(TodoFilterStrip);

export default MemoizedTodoFilterStrip;
