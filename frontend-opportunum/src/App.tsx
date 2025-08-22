import { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Estacao43 from "./pages/Estacao43";
import Estacao44 from "./pages/Estacao44";
import PaginaGenerica from "./pages/PaginaGenerica";
import Home from "./pages/Home";
import Login from "./pages/Login"; 

const drawerWidth = 240;

function AppContent() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const isLoginPage = location.pathname === "/login";
  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
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
          <Route path="/" element={<Home />} />
          <Route path="/planilha/:nome" element={<PaginaGenerica />} />
          <Route path="/planilha/estacao43" element={<Estacao43 />} />
          <Route path="/planilha/estacao44" element={<Estacao44 />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
