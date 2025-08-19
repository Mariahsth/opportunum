import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
    handleDrawerToggle: () => void;
  }

export default function Header({ handleDrawerToggle }:HeaderProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'var(--color-appbar-bg)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
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
      </Toolbar>
    </AppBar>
  );
}
