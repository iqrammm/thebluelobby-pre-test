import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import TodoFilterStrip from "components/todos/filter-strip";
import TodoList from "components/todos/list";
import { FC } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";

const Todos: FC = () => {
  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Box
          sx={{
            boxShadow: 3,
            padding: 3,
            borderRadius: 4
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
            <AssignmentIcon fontSize="large" />
            <Typography component="h1" variant="h4">
              Task Manager Application
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ mt: 1, boxShadow: 3, width: "95%", mx: 3 }}>
          <TodoFilterStrip />
          <Divider variant="fullWidth" />
          <TodoList />
        </Box>
      </Box>
    </Container>
  );
};

export default Todos;
