import {
    Box,
    Divider,
    Toolbar,
    Typography,
    TextField,
    Card,
    CardContent,
    Grid,
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Paper,
    IconButton,
  } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  
  const drawerWidth = 240;
  
  const labels = [
    "Perspectiva",
    "Objetivo Estratégico",
    "Estratégia",
    "Objetivo",
    "Resultado chave",
    "Prazo",
    "Responsável",
  ];
  
  const rows = [
    {
      prazo: "2025-09-30",
      kr: "KR 1",
      resultado: "Alcançar aumento de 20% na captação de recursos institucionais.",
      responsavel: "Mariah",
    },
  ];
  
  export default function Estacao43() {
    return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography
          variant="h2"
          sx={{ textAlign: "center", mb: 2 }}
        >
          Planejamento Estratégico Instituto Estação 43
        </Typography>
        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", mb: 3 }} />
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              {labels.map((label, index) => (
                <Grid key={label} size={{ xs: 12, sm: index === 0 ? 12 : 6 }}>
                  <TextField
                    fullWidth
                    label={label}
                    variant="outlined"
                    type={label === "Prazo" ? "date" : "text"}
                    slotProps={
                      label === "Prazo" ? { inputLabel: { shrink: true } } : undefined
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
  
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "var(--color-text-blue)", fontWeight: 600 }}>
                      Prazo
                    </TableCell>
                    <TableCell sx={{ color: "var(--color-text-blue)", fontWeight: 600 }}>
                      KR
                    </TableCell>
                    <TableCell
                      sx={{ width: "50%", color: "var(--color-text-blue)", fontWeight: 600 }}
                    >
                      Resultados Chave (O que alcançar - Mensurável)
                    </TableCell>
                    <TableCell sx={{ color: "var(--color-text-blue)", fontWeight: 600 }}>
                      Responsáveis
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "var(--color-text-blue)", fontWeight: 600 }}
                    >
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>
  
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      hover
                      onClick={() => console.log("Linha clicada:", row)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>
                        {new Date(row.prazo).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell>{row.kr}</TableCell>
                      <TableCell>{row.resultado}</TableCell>
                      <TableCell>{row.responsavel}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Editar:", row);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Deletar:", row);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    );
  }
  