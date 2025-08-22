import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import type { HeaderProps } from "../interface/HeaderProps";
import { CircleUserRound } from "lucide-react";
import { useState } from "react";

// perfil atual (mock por enquanto) - depois passar isso via Context/Auth
const userRole: "master" | "admin" | "assistant" = "master";


export default function Header({ handleDrawerToggle }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Deslogar usuário...");
    handleClose();
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
          {userRole === "master" && (
            <MenuItem >Gerenciar usuários</MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
