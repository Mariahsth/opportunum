import {
  TextField,
  Grid,
} from "@mui/material";

const labels = [
  "Perspectiva",
  "Objetivo Estratégico",
  "Estratégia",
  "Objetivo",
  "Resultado chave",
  "Prazo",
  "Responsável",
];

export default function Form() {
  return (
    <>
      <Grid container spacing={2}>
        {labels.map((label, index) => (
          <Grid key={label} size={{ xs: 12, sm: index === 0 ? 12 : 6 }}>
            <TextField
              fullWidth
              label={label}
              variant="outlined"
              type={label === "Prazo" ? "date" : "text"}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
