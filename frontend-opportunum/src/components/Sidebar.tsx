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
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { SidebarProps } from "../interface/SidebarProps";
import { useNavigate } from "react-router-dom";

// páginas de exemplo -> depois buscar no banco de dados
const paginasDisponiveis = [
  { name: "Instituto Estação 43", path: "/estacao43" },
  { name: "Instituto Estação 44", path: "/estacao44" },
];

// perfil atual (mock por enquanto) - depois passar isso via Context/Auth
const userRole: "master" | "admin" | "assistant" = "master";

export default function Sidebar({
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
}: SidebarProps) {
  const [open, setOpen] = useState(false);
  const [newPage, setNewPage] = useState("");
  const [paginas, setPaginas] = useState(paginasDisponiveis);
  const navigate = useNavigate();
  const location = useLocation();

  const drawerContent = (
    <div>
      <Toolbar />
      <List>
        <Typography sx={{ color: "#ffffff47", m: 1 }}>
          Planilhas disponíveis:
        </Typography>
        <Divider
          sx={{
            mb: 3,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            height: "3px",
          }}
        />
        {paginas.map((page, index, array) => (
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
                <IconButton color="inherit" onClick={() => setOpen(true)}>
                  <AddCircleOutlineIcon fontSize="large" color="primary" />
                </IconButton>
               
              </Tooltip>

              {/* Modal que abre ao clicar no botão de add planilha */}
              <Dialog open={open} onClose={() => setOpen(false)}>
                  <DialogTitle>Criar nova planilha</DialogTitle>
                  <DialogContent>
                    <TextField
                      label="Nome"
                      fullWidth
                      value={newPage}
                      sx={{mt:3}}
                      onChange={(e) => setNewPage(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button
                    onClick={() => {
                      const path = `/planilha/${newPage.toLowerCase().replace(/\s+/g, "-")}`;
                      setPaginas((prev) => [...prev, { name: newPage, path }]);
                      setOpen(false);
                      navigate(path);
                      setNewPage("");
                    }}
                    >
                      Salvar
                    </Button>
                  </DialogActions>
                </Dialog>
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
