import { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Estacao43 from "./pages/Estacao43";
import Estacao44 from "./pages/Estacao44";
import PaginaGenerica from "./pages/PaginaGenerica";

const drawerWidth = 240;

export default function App() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
            mt: 2,
            p: 2,
          }}
        >
          <Routes>
            <Route path="/" element={<Estacao43 />} />
            <Route path="/planilha/:nome" element={<PaginaGenerica />} />
            <Route path="/estacao43" element={<Estacao43 />} />
            <Route path="/estacao44" element={<Estacao44 />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}
