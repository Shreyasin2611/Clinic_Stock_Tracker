import { Box, Typography } from "@mui/material";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function PageHeader({ title, subtitle }) {
      usePageTitle(title);
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h1">{title}</Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}