import { Box, Toolbar, Typography, Divider, Card, CardContent, Grid } from "@mui/material";

export default function Home() {
const projetos =["projeto1", "projeto2", "projeto3", "projeto 4"]
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
            <Grid size={{ xs: 12, sm: 6 }} key={projeto} >
                <Card >
                    <CardContent sx={{display:'flex', justifyContent:'center'}}>
                        <Typography>{projeto}</Typography>
                    </CardContent>
                </Card>
            </Grid>

        ))}


      </Grid>


    </Box>
  );
}
