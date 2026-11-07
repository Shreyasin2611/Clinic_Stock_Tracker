import { Box, Typography } from "@mui/material";

export default function PageHeader({ title, subtitle }) {
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