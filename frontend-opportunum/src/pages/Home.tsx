import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Divider,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  List,
  ListItem,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import DashboardProgress from "../components/DashboardProgress";
import { fetchTasksByProject } from "../services/taskService";
import type { ITask } from "../interface/Task";
import { Link } from "react-router-dom";
import DashboardOverallBar from "../components/DashboardOverallBar";
import UserTasksTable from "../components/UserTaskTable";

export default function Home() {
  const { user, loading, projects } = useAuth();
  const [tasksByProject, setTasksByProject] = useState<Record<string, ITask[]>>(
    {}
  );
  const [loadingTasks, setLoadingTasks] = useState(false);

  const andamentoGeral = projects.reduce<Record<string, number>>(
    (acc, proj) => {
      const projectTasks = tasksByProject[proj._id] || [];
      projectTasks.forEach((task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
      });
      return acc;
    },
    {}
  );
  
  useEffect(() => {
    async function loadAllTasks() {
      if (!projects.length) return;
      setLoadingTasks(true);
      
      try {
        const tasksMap: Record<string, ITask[]> = {};
        for (const proj of projects) {
          const tasks = await fetchTasksByProject(proj._id);
          tasksMap[proj._id] = tasks;
        }

        setTasksByProject(tasksMap);
      } catch (err) {
        console.error("Erro ao carregar tasks:", err);
      } finally {
        setLoadingTasks(false);
      }
    }

    loadAllTasks();
  }, [projects]);

  const allTasks = useMemo(() => {
    return Object.values(tasksByProject).flat();
  }, [tasksByProject]);

  const andamentoUser = allTasks.reduce<Record<string, number>>((acc, task) => {
    const isUserTask = task.responsaveis.some((resp) =>
      typeof resp === "string" ? resp === user?._id : resp._id === user?._id
    );
  
    if (isUserTask) {
      acc[task.status] = (acc[task.status] || 0) + 1;
    }
  
    return acc;
  }, {});
  
  if (loading || loadingTasks) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Toolbar />
      <Typography variant="h2" sx={{ textAlign: "center", mb: 2 }}>
        OKRs de Planejamento Estratégico
      </Typography>
      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", mb: 3 }} />

      <Card>
        <CardContent>
          <Typography sx={{ fontSize: "2rem", mb: 2 }}>
            Olá, {user?.name}
          </Typography>
          <Box>
            <List>
              {projects.length > 0 ? (
                <Typography>
                  Você está envolvido(a) em {projects.length} projetos:
                </Typography>
              ) : (
                <Typography>
                  Você ainda não está envolvido(a) em nenhum projeto
                </Typography>
              )}

              {projects.map((project) => {
                const slug = project.title.toLowerCase().replace(/\s+/g, "-");
                return (
                  <ListItem
                    component={Link}
                    to={`planilha/${slug}`}
                    key={project._id}
                    sx={{
                      color: "primary.main",
                      p: 0,
                      "&:hover": { color: "text.primary" },
                    }}
                  >
                    {project.title}
                  </ListItem>
                );
              })}
            </List>
            <Typography sx={{ mt: 5, fontSize: "1.5rem" }}>
              Suas atividades pendentes:
            </Typography>
            <UserTasksTable
              allTasks={allTasks}
              projects={projects}
              tasksByProject={tasksByProject}
            />
          </Box>
        </CardContent>
      </Card>

      {allTasks.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent
            sx={{
              p: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 10,
              },
            }}
          >
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              {" "}
              Resumo Geral das Suas Atividades{" "}
            </Typography>{" "}
            <DashboardOverallBar andamentoGeral={andamentoUser} />
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              Resumo Geral dos Seus Projetos
            </Typography>
            <DashboardOverallBar andamentoGeral={andamentoGeral} />
          </CardContent>
        </Card>
      )}

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {projects.map((projeto) => {
          const projectTasks = tasksByProject[projeto._id] || [];
          const andamentoData = projectTasks.map((task) => task.status);
          const slug = projeto.title.toLowerCase().replace(/\s+/g, "-");

          return (
            <Grid size={{ xs: 12, sm: 6 }} key={projeto._id}>
              <Card>
                <CardContent
                  component={Link}
                  to={`planilha/${slug}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "text.primary",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: 3,
                      transform: "scale(1.02)",
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {projeto.title}
                  </Typography>
                  <DashboardProgress andamentoData={andamentoData} />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
