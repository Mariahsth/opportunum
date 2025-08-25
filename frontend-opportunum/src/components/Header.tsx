import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import type { HeaderProps } from "../interface/HeaderProps";
import { CircleUserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";



export default function Header({ handleDrawerToggle }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const isMaster = user?.roles.includes("master");
  const isAdmin = user?.roles.includes("admin");

  if (loading) {
    return null; 
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleClose();
    navigate("/login");
  };
  const handleTeams = async () => {
    handleClose();
    navigate("/teams");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "var(--color-appbar-bg)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Acompanhamento de Planos OKR
        </Typography>
        <Button
          onClick={handleClick}
          startIcon={
            <CircleUserRound size={30} color="var(--color-text-light)" />
          }
          sx={{ padding: 0, minWidth: "auto" }}
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
          {(isMaster || isAdmin) && (
            <MenuItem onClick={handleTeams}>Gerenciar equipe</MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
