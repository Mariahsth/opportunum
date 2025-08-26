import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Toolbar,
    Link,
  } from "@mui/material";
  import { useState } from "react";
  import { registerUser } from "../services/authService";
  import { Link as RouterLink, useNavigate } from "react-router-dom";
import { isStrongPassword, isValidEmail, isValidName } from "../utils/validators";
  
  export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
      
        if (!isValidName(name)) {
          setError("Nome inválido. Use ao menos 3 letras, sem números ou símbolos.");
          return;
        }
      
        if (!isValidEmail(email)) {
          setError("Email inválido.");
          return;
        }
      
        if (!isStrongPassword(senha)) {
          setError("A senha deve ter ao menos 6 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.");
          return;
        }
      
        setLoading(true);
        try {
          await registerUser(name, email, senha);
          alert("Cadastro realizado com sucesso!");
          navigate("/login");
        } catch (err) {
          setError(typeof err === "string" ? err : "Erro inesperado");
        }
        setLoading(false);
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
          sx={{
            padding: 4,
            width: "100%",
            maxWidth: 400,
            bgcolor: "var(--color-bg)",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Cadastro
          </Typography>
  
          <Box component="form" onSubmit={handleRegister}>
            <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                margin="normal"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              disabled={loading}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              {loading ? "Enviando..." : "Enviar"}
            </Button>
            <Link
              component={RouterLink}
              to="/login"
              sx={{
                display: "block",
                marginTop: 2,
                cursor: "pointer",
                textDecoration: "none",
                color: "text.primary",
                "&:hover": {color:'primary.main'}
              }}
            >
              Voltar ao login
            </Link>
          </Box>
        </Paper>
  
        <Typography variant="h2" sx={{ textAlign: "center", my: 5 }}>
          Opportunum
        </Typography>
      </Box>
    );
  }
  