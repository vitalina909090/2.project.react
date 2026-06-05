import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#111111",
      light: "#333333",
      dark: "#000000",
    },
    secondary: {
      main: "#555555",
    },
    background: {
      default: "#f0ede5", // фон сторінки
      paper: "#fbf9f4", // фон компонентів на кшталт карток
    },
  },
  typography: {
    fontFamily: "'Segoe Print', 'Bradley Hand', Chilanka, TSCu_Comic, casual, cursive",
    h1: { 
      fontSize: "2.5rem", 
      fontWeight: 700,
      textTransform: "uppercase"
    },
    h4: {
      fontSize: "1.5rem", 
      fontWeight: 600,
      fontStyle: "italic",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      textAlign: "justify",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 0,
  },
 
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 5,
          fontWeight: 700,
          margin: "0 8px",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fbf9f4",
          color: "#111111",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        },
      },
    },
    // для майбутніх карточок товарів та статей
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          borderRadius: 8,

        },
      },
    },
  },
});
 
export default theme;