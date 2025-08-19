import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import React from "react";

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  drawerWidth: number;
}

const paginasDisponiveis=['Instituto Estação 43', 'Instituto Estação 41', 'Instituto Estação 45']
export default function Sidebar({
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
}: SidebarProps) {
  const drawerContent = (
    <div>
      <Toolbar />
      <List>
        {paginasDisponiveis.map((text, index, array) => (
          <React.Fragment key={index}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>

            {/* Adiciona o Divider, exceto no último item */}
            {index < array.length - 1 && (
              <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
            )}
          </React.Fragment>
        ))}
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
