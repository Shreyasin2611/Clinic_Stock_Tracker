import { NavLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const tabSx = {
  display: "flex",
  alignItems: "center",
  height: "100%",
  px: 2,
  color: "text.secondary",
  fontWeight: 500,
  textDecoration: "none",
  borderBottom: "3px solid transparent",
  "&.active": { color: "primary.main", borderBottomColor: "primary.main" },
};

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <Box
      component="header"
      sx={{ bgcolor: "background.paper", borderBottom: 1, borderColor: "divider" }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
          px: 3,
          height: 64,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h2" sx={{ mr: "auto" }}>
          Clinic Stock Tracker
        </Typography>
        <Box component={NavLink} to="/" end sx={tabSx}>
          Dashboard
        </Box>
        <Box component={NavLink} to="/inventory" sx={tabSx}>
          Manage inventory
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
          {user?.email}
        </Typography>
        <Button variant="outlined" onClick={logout} sx={{ ml: 1 }}>
          Log out
        </Button>
      </Box>
    </Box>
  );
}