import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems:'center', gap:2, mt: 4, height:'50vh' }}>
        <CircularProgress size={30}/>
        <Typography>Carregando...</Typography>
      </Box>
    );

  return user ? children : <Navigate to="/login" />;
}
