import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { FC } from "react";
import { Todo } from "types/todo";
import { FormMode } from "types";
import TodoForm from "components/todos/modal/form";

interface CreateTodoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  todo: Partial<Todo>;
  mode: FormMode;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const CreateTodoModal: FC<CreateTodoModalProps> = ({ setOpen, open, todo, mode }) => {
  return (
    <div>
      <Modal
        aria-labelledby="create-todo-modal"
        aria-describedby="modal-to-create-todo"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TodoForm todo={todo} mode={mode} setModalOpen={setOpen} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateTodoModal;
