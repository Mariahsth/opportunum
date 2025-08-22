import {
  Box,
  Toolbar,
  Typography,
  Divider,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import CustomTable from "../components/CustomTable";
import { Trash2 } from "lucide-react";

export default function Estacao43() {
  const { nome } = useParams();

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
          PLANEJAMENTO ESTRATÉGICO{" "}
          {nome?.replace(/-/g, " ").toLocaleUpperCase()}
        </Typography>
        <Button
          startIcon={<Trash2 />}
          sx={{ padding: 0, minWidth: "auto", mb: 2 }}
          onClick={() => alert('Excluindo planilha')}
        />
      </Box>
      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", mb: 3 }} />

      <Card>
        <CardContent>
          <Form />
        </CardContent>
      </Card>

      <Card sx={{ mt: 2 }}>
        <CardContent>
          <CustomTable />
        </CardContent>
      </Card>
    </Box>
  );
}
