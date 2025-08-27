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
import { useAuth } from "../hooks/useAuth";
import { createProject } from "../services/projectsService";


export default function Sidebar({
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
}: SidebarProps) {
  const [open, setOpen] = useState(false);
  const [newPage, setNewPage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, projects, refreshProjects } = useAuth();
  const isMaster = user?.roles.includes("master");

  if (loading) {
    return null; 
  }

  const handleCreateProject = async (title:string) => {
    try {
      const createdProject = await createProject(title);
      await refreshProjects?.();
      const slug = createdProject.title
        .toLowerCase()
        .replace(/\s+/g, "-");
      setOpen(false);
      navigate(`/planilha/${slug}`);
      setNewPage("");
    } catch (err) {
      console.error(err);
    }
  }

  const drawerContent = (
    <div>
      <Toolbar />
      <List>
      
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={"/"}
            selected={location.pathname === "/"}
          >
            <ListItemText >Meus Projetos</ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)", mb:3
          }}
        />
        <Typography sx={{ color: "#ffffff47", m: 1, ml:4 }}>
          Planilhas disponíveis:
        </Typography>
        <Divider
        variant="middle"
          sx={{
            mb: 3,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            height: "3px",
          }}
        />
        {projects.map((page, index, array) => {
          const slug = page.title.toLowerCase().replace(/\s+/g, "-"); 

          return (
            <React.Fragment key={page._id}>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to={`planilha/${slug}`}
                  selected={location.pathname === `planilha/${slug}`}
                >
                  <ListItemText primary={page.title} />
                </ListItemButton>
              </ListItem>

              {index < array.length - 1 && (
                <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
              )}
            </React.Fragment>
          )
        })}

        {/* Botão de adicionar planilha (apenas Master vê) */}
        {isMaster && (
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
                    sx={{ mt: 3 }}
                    onChange={(e) => setNewPage(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)}>Cancelar</Button>
                  <Button
                    onClick={() => handleCreateProject(newPage)}
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
