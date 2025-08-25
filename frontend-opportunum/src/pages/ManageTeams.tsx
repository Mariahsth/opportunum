import {
  Box,
  Toolbar,
  Typography,
  Divider,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchAllUsers } from "../services/userService";
import type { User } from "../interface/User";
import { EditIcon, SaveIcon, Trash } from "lucide-react";

export default function ManageTeams() {
  const [equipe, setEquipe] = useState([]);
  const { user, loading } = useAuth();
  const [modoEdicao, setModoEdicao] = useState<Record<string, boolean>>({});

  const handleSave = (id: string) => {
    setModoEdicao((prev) => ({ ...prev, [id]: false }));

  }
  const handleEdit = (id: string) => {
    setModoEdicao((prev) => ({ ...prev, [id]: true }));
  }

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const usuarios = await fetchAllUsers();
        setEquipe(usuarios);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    };

    carregarUsuarios();
  }, []);

  return (
    <Box>
      <Toolbar />
      <Typography variant="h2" sx={{ textAlign: "center", mb: 2 }}>
        Gerenciar Equipe
      </Typography>
      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", mb: 3 }} />

      <Card>
        <CardContent>
          <Typography>Olá, {user?.name}</Typography>
          <Typography>
            Você tem {equipe.length} membros na sua equipe
          </Typography>
        </CardContent>
      </Card>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {equipe.map((membro: User, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index}>
            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: '1rem'
                }}
              >
                <Box>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}
                  >
                    <Typography>Nome: </Typography>
                    <Typography>{membro.name}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}
                  >
                    <Typography>Email:</Typography>
                    <Typography>{membro.email}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}
                  >
                    <Typography>Tipo de acesso:</Typography>
                    <Typography>{membro.roles}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}
                  >
                    <Typography>Times:</Typography>
                    <Typography>{membro.teams}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection:'column'
                  }}
                >
                  <Button
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="success"
                    disabled={!modoEdicao[membro._id]}
                    onClick={() => handleSave(membro._id)}
                  >
                    Salvar
                  </Button>
                  <Button
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<EditIcon />}
                    variant="contained"
                    disabled={!!modoEdicao[membro._id]}
                    sx={{ mt: 2 }}
                    onClick={() => handleEdit(membro._id)}
                  >
                    Editar
                  </Button>
                  <Button
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<Trash />}
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                  >
                    Deletar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
