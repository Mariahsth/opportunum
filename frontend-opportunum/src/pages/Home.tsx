import { Box, Toolbar, Typography, Divider, Card, CardContent, Grid, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchProjects } from "../services/projectsService";
import type { IProject } from "../interface/Project";


export default function Home() {
  const [projetos, setProjetos] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjetos(data);
      } catch (err) {
        console.error("Erro ao carregar projetos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
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
            <Typography>Olá, usuário</Typography>
            <Typography>Você tem {projetos.length} projetos em andamento</Typography>
        </CardContent>
      </Card>
      <Grid container spacing={2} sx={{mt:3}}>
        {projetos.map((projeto) => (
            <Grid size={{ xs: 12, sm: 6 }} key={projeto._id} >
                <Card >
                    <CardContent sx={{display:'flex', justifyContent:'center'}}>
                        <Typography>{projeto.title}</Typography>
                    </CardContent>
                </Card>
            </Grid>

        ))}


      </Grid>


    </Box>
  );
}
