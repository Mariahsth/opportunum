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
  Collapse,
  MenuItem,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { SidebarProps } from "../interface/SidebarProps";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { createProject } from "../services/projectsService";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { municipios } from "../utils/municipios";

export default function Sidebar({
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
}: SidebarProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, projects, refreshProjects } = useAuth();
  const isMaster = user?.roles.includes("master");
  const [openMunicipio, setOpenMunicipio] = useState<Record<string, boolean>>(
    {}
  );
  const [newProject, setNewProject] = useState({
    title: "",
    municipio: "",
  });

  if (loading) {
    return null;
  }

  const groupedProjects = projects.reduce(
    (acc: Record<string, typeof projects>, project) => {
      const municipio = project.municipio || "Sem município";
      if (!acc[municipio]) acc[municipio] = [];
      acc[municipio].push(project);
      return acc;
    },
    {}
  );

  const toggleMunicipio = (municipio: string) => {
    setOpenMunicipio((prev) => ({ ...prev, [municipio]: !prev[municipio] }));
  };

  const handleCreateProject = async () => {
    try {
      const createdProject = await createProject(newProject);
      await refreshProjects?.();
      const slug = createdProject.title.toLowerCase().replace(/\s+/g, "-");
      setOpen(false);
      setNewProject({ title: "", municipio: "" });
      navigate(`/planilha/${slug}`);
    } catch (err) {
      console.error(err);
      alert("Erro ao criar projeto");
    }
  };

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
            <ListItemText>Meus Projetos</ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            mb: 3,
          }}
        />
        <Typography sx={{ color: "#ffffff47", m: 1, ml: 4 }}>
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
        {Object.entries(groupedProjects).map(([municipio, projList]) => (
          <React.Fragment key={municipio}>
            <ListItemButton onClick={() => toggleMunicipio(municipio)}>
              <ListItemText
                primary={municipio}
                sx={{ color: "primary.main" }}
              />
              {openMunicipio[municipio] ? (
                <ExpandLess sx={{ color: "primary.main" }} />
              ) : (
                <ExpandMore sx={{ color: "primary.main" }} />
              )}
            </ListItemButton>
            <Collapse
              in={openMunicipio[municipio]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {projList.map((page) => {
                  const slug = page.title.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <ListItem key={page._id} disablePadding sx={{ pl: 1 }}>
                      <ListItemButton
                        component={Link}
                        to={`planilha/${slug}`}
                        selected={location.pathname === `planilha/${slug}`}
                        sx={{ py: 0, pr: 0 }}
                      >
                        <ListItemText
                          primary={page.title}
                          secondary={page.numeroEstrategia}
                          slotProps={{
                            primary: {
                              sx: {
                                color: "var(--color-bg)",
                                fontWeight: "400",
                              },
                            },
                            secondary: {
                              sx: {
                                color: "var(--color-text-blue)",
                                fontWeight: "bold",
                              },
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </React.Fragment>
        ))}

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
                    fullWidth
                    label="Título do Projeto"
                    variant="outlined"
                    value={newProject.title}
                    sx={{ my: 2 }}
                    onChange={(e) =>
                      setNewProject({ ...newProject, title: e.target.value })
                    }
                  />

                  <TextField
                    select
                    fullWidth
                    label="Município"
                    variant="outlined"
                    value={newProject.municipio}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        municipio: e.target.value,
                      })
                    }
                  >
                    {municipios.map((cidade) => (
                      <MenuItem key={cidade} value={cidade}>
                        {cidade}
                      </MenuItem>
                    ))}
                  </TextField>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)}>Cancelar</Button>
                  <Button onClick={() => handleCreateProject()}>Salvar</Button>
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
