import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { SidebarProps } from "../interface/SidebarProps";

// páginas de exemplo -> depois fazer dinamico
const paginasDisponiveis = [
  { name: "Instituto Estação 43", path: "/estacao43" },
  { name: "Instituto Estação 44", path: "/estacao44" },
  { name: "Instituto Estação 45", path: "/estacao45" },
];

// perfil atual (mock por enquanto) - depois passar isso via Context/Auth
const userRole: "master" | "admin" | "assistant" = "master";

export default function Sidebar({
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
}: SidebarProps) {
  const location = useLocation();

  const drawerContent = (
    <div>
      <Toolbar />
      <List>
        {paginasDisponiveis.map((page, index, array) => (
          <React.Fragment key={page.path}>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={page.path}
                selected={location.pathname === page.path}
              >
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>

            {index < array.length - 1 && (
              <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
            )}
          </React.Fragment>
        ))}

        {/* Botão de adicionar planilha (apenas Master vê) */}
        {userRole === "master" && (
          <>
            <Divider
              sx={{ my: 1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            />
            <ListItem disablePadding sx={{ justifyContent: "center" }}>
              <Tooltip title="Criar nova planilha">
                <IconButton
                  color="inherit"
                  onClick={() => {
                    // futuramente: abre modal ou redireciona para página de criação
                    alert("Criar nova planilha");
                  }}
                >
                  <AddCircleOutlineIcon fontSize="large" color="primary" />
                </IconButton>
              </Tooltip>
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="menu drawer"
    >
      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "var(--color-appbar-bg)",
            color: "var(--color-text-light)",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "var(--color-drawer-bg-desktop)",
            color: "var(--color-text-light)",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
