import { Box, Button, TextField, Typography, Paper, Toolbar } from "@mui/material";
import { useState } from "react";
import { loginUser } from "../services/authService"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(email, senha);
      alert("Login realizado com sucesso!");
      window.location.href = "/";

    } catch (err) {
      setError(typeof err === "string" ? err : "Erro inesperado");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="var(--color-appbar-bg)"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Toolbar />

      <Typography variant="h2" sx={{ textAlign: "center", mb: 5 }}>
        OKRs de Planejamento Estratégico
      </Typography>

      <Paper
        elevation={3}
        sx={{ padding: 4, width: "100%", maxWidth: 400, bgcolor: "var(--color-bg)" }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              "& label": {
                bgcolor: "var(--color-bg)",
              },
              "& label.Mui-focused": {
                bgcolor: "var(--color-bg)",
              },
              input: {
                bgcolor: "var(--color-bg)",
              },
            }}
          />
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Entrar
          </Button>
        </Box>
      </Paper>

      <Typography variant="h2" sx={{ textAlign: "center", my: 5 }}>
        Opportunum
      </Typography>
    </Box>
  );
}
