import {
  TextField,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { EditIcon, SaveIcon } from "lucide-react";
import { useState } from "react";

const labels = [
  "Perspectiva/Eixo",
  "Nº da Estratégia",
  "Resultado chave",
  "Objetivo",
  "Objetivo Estratégico",
  "Estratégia",
  "Prazo",
  "Responsável",
];

export default function Form() {
    const [loading, setLoading] = useState(false);
    const [salvo, setSalvo] = useState(true);

    const handleSave = () => {
        setLoading(true)
        setSalvo(true);
        setLoading(false)

    }
    const handleEdit = () => {
        setSalvo(false)
        console.log("Editando")
    }

  return (
    <>
      <Grid container spacing={2}>
        {labels.map((label, index) => (
          <Grid key={label} size={{ xs: 12, sm: index === 4 || index === 5 ? 12 : 6 }}>
            <TextField
              fullWidth
              label={label}
              disabled={salvo}
              variant="outlined"
              type={label === "Prazo" ? "date" : "text"}
              multiline
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{display:'flex', gap:2}}>
        <Button
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            color="success"
            sx={{mt:2}}
            onClick={() => handleSave()}
            >
            Salvar
            </Button>
        <Button
            loading={loading}
            loadingPosition="start"
            startIcon={<EditIcon />}
            variant="contained"
            sx={{mt:2}}
            onClick={() => handleEdit()}
            >
            Editar
            </Button>

      </Box>
    </>
  );
}
