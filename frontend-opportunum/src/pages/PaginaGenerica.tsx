import {
  Box,
  Toolbar,
  Typography,
  Divider,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";
import CustomTable from "../components/CustomTable/CustomTable";
import { Trash2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { deleteProject } from "../services/projectsService";

export default function PaginaGenerica() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading, projects, refreshProjects } = useAuth();
  const isMaster = user?.roles.includes("master");

  if (loading) {
    return null;
  }

  const project = projects.find(
    (p) => p._id === id
  );

  const handleDelete = async () => {
    if (!project?._id) return alert("Projeto não encontrado!");
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o projeto "${project.title}"?`
    );
    if (!confirmDelete) return;

    try {
      await deleteProject(project._id);
      await refreshProjects?.();
      alert("Projeto excluído com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir projeto");
    }
  };

  return (
    <Box>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ textAlign: "center", mb: 2 }}>
          
          {project?.title}
        </Typography>
        {isMaster && (
          <Button
            startIcon={<Trash2 />}
            sx={{ padding: 0, minWidth: "auto", mb: 2 }}
            onClick={() => handleDelete()}
          />
        )}
      </Box>
      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", mb: 3 }} />

      <Card>
        <CardContent>
          {project ? (
            <Form project={project} />
          ) : (
            <p>Projeto não encontrado.</p>
          )}
        </CardContent>
      </Card>

      <Card sx={{ mt: 2 }}>
        <CardContent>
          <CustomTable projectId={project?._id}/>
        </CardContent>
      </Card>
    </Box>
  );
}
