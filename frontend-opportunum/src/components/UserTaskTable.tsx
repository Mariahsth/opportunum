import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import type { ITask } from "../interface/Task";
import type { IProject } from "../interface/Project";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { formatDateToDisplay, isDateAtrasada } from "../utils/formatDate";

interface UserTasksTableProps {
  allTasks: ITask[];
  projects: IProject[];
  tasksByProject: Record<string, ITask[]>;
}

export default function UserTasksTable({
    allTasks,
    projects,
    tasksByProject,
  }: UserTasksTableProps) {
    const { user } = useAuth();
    const userTasks = allTasks.filter(
      (task) =>
        task.status !== "concluído" &&
        task.responsaveis.some((resp) =>
          typeof resp === "string" ? resp === user!._id : resp._id === user!._id
        )
    );
  
    if (userTasks.length === 0) {
      return (
        <Paper sx={{ mt: 3, p: 3, textAlign: "center" }}>
          Você não possui atividades pendentes
        </Paper>
      );
    }
  
    return (
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Projeto</strong>
              </TableCell>
              <TableCell>
                <strong>Atividade</strong>
              </TableCell>
              <TableCell>
                <strong>Prazo</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userTasks.map((task) => {
              const project = projects.find((proj) =>
                tasksByProject[proj._id]?.some((t) => t._id === task._id)
              );
  
              if (!project) return null;
  
  
              const isAtrasado = isDateAtrasada(task.prazo, task.status);
  
              return (
                <TableRow
                  key={task._id}
                  component={Link}
                  to={`planilha/${project._id}`}
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{task.resultados}</TableCell>
                  <TableCell>{formatDateToDisplay(task.prazo)}</TableCell>
                  <TableCell
                    sx={{
                      color: isAtrasado ? "error.main" : "success.main",
                    }}
                  >
                    {isAtrasado ? "Atrasado" : "Dentro do prazo"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  