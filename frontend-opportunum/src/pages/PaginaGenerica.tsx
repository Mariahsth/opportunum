import { Box, Toolbar, Typography, Divider, Card, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import CustomTable from "../components/CustomTable";

export default function PaginaGenerica() {
  const { nome } = useParams();

  return (
    <Box>
      <Toolbar />
      <Typography variant="h2" sx={{ textAlign: "center", mb: 2 }}>
        PLANEJAMENTO ESTRATÉGICO {nome?.replace(/-/g, " ").toLocaleUpperCase()}
      </Typography>
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
