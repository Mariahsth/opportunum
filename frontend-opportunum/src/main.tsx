import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif", 
    allVariants: {
      fontWeight: 500, 
    },
    h2: {
      fontSize: "1.5rem",  
      fontWeight: 800,    
      color: "var(--color-text-gray)", 
    },
  },
  palette: {
    mode: "light", // ou "dark"
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#d7dce2", 
      paper: "#ffffff",   
    },
    text: {
      primary: "#1a1a1a",
    },

  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "var(--color-text-blue)",
          fontWeight: 800,
        },
        body: {
          color: "var(--color-text-gray)",
          fontWeight: 500,
        }
      },
    },
  }
});



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <CssBaseline/>

    </ThemeProvider>
  </StrictMode>,
)
