"use client";
import { createTheme } from "@mui/material/styles";
import { Poppins } from "./font";

const theme = createTheme({
  typography: {
    fontFamily: Poppins.style.fontFamily,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#FF8436",
    },
    secondary: {
      main: "#151827",
    },
    background: {
      default: "#F2F2F4",
      paper: "#F2F2F4",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
