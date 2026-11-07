import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SummaryStats({ counts }) {
  const { palette } = useTheme();
  const s = palette.status;
  const cards = [
    { label: "Total items", value: counts.total, color: palette.text.primary },
    { label: "OK", value: counts.ok, color: s.ok },
    { label: "Near threshold", value: counts.near, color: s.near },
    { label: "Low", value: counts.low, color: s.low },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
        gap: 3,
      }}
    >
      {cards.map((card) => (
        <Paper key={card.label} sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {card.label}
          </Typography>
          <Typography sx={{ fontSize: 32, fontWeight: 600, color: card.color }}>
            {card.value}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}