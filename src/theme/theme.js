import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#0F6B5E", dark: "#0B524A", contrastText: "#FFFFFF" },
    success: { main: "#2E9E6B" },
    warning: { main: "#B7860B" },
    error: { main: "#D64545" },
    background: { default: "#F4F7F6", paper: "#FFFFFF" },
    text: { primary: "#1F2933", secondary: "#66757F" },
    divider: "#E2E8E6",
    status: {
      ok: "#2E9E6B",
      okBg: "#E6F5EE",
      near: "#B7860B",
      nearBg: "#FFF4D6",
      low: "#D64545",
      lowBg: "#FDE8E8",
    },
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    h1: { fontSize: 24, fontWeight: 600 },
    h2: { fontSize: 18, fontWeight: 600 },
    body1: { fontSize: 14 },
    body2: { fontSize: 14 },
    caption: { fontSize: 12, fontWeight: 500 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { height: 40, paddingInline: 16 } },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
      },
    },
  },
});

export default theme;