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
          px: { xs: 2, sm: 3 },
          minHeight: 64,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          columnGap: 1,
        }}
      >
        <Typography variant="h2" sx={{ mr: "auto", py: 1, order: 1 }}>
          Clinic Stock Tracker
        </Typography>

        <Box
          component="nav"
          aria-label="Main"
          sx={{
            display: "flex",
            height: { xs: 48, md: 64 },
            width: { xs: "100%", md: "auto" },
            overflowX: "auto",
            order: { xs: 3, md: 2 },
          }}
        >

        <Box component={NavLink} to="/" end sx={tabSx}>
          Dashboard
        </Box>
        <Box component={NavLink} to="/inventory" sx={tabSx}>
          Manage inventory
        </Box>
                <Box component={NavLink} to="/summary" sx={tabSx}>
          Stock summary
        </Box>
      </Box>

        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ ml: 2, order: 3, display: { xs: "none", md: "block" } }}
        >
          {user?.email}
        </Typography>

        <Button variant="outlined" onClick={logout} sx={{ order: { xs: 2, md: 4 } }}>
          Log out
        </Button>
      </Box>
    </Box>
  );
}