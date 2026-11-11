import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFoundPage() {
  usePageTitle("Page not found");

  return (
    <Box sx={{ textAlign: "center", mt: 10, px: 2 }}>
      <Typography variant="h1" sx={{ mb: 1 }}>
        Page not found
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/">
        Back to dashboard
      </Button>
    </Box>
  );
}