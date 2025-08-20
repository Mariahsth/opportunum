import {
  Box,
  Toolbar,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

import Form from "../components/Form";
import CustomTable from "../components/CustomTable";

const drawerWidth = 240;



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
      <Typography variant="h2" sx={{ textAlign: "center", mb: 2 }}>
        Planejamento Estratégico Instituto Estação 43
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
