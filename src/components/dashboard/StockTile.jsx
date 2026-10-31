import { Box, LinearProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getStatus } from "../../utils/stockStatus";

const LABELS = { ok: "OK", near: "Near threshold", low: "Low" };

export default function StockTile({ item }) {
  const { palette } = useTheme();
  const status = getStatus(item.quantity, item.threshold);
  const color = palette.status[status];
  const progress = Math.min(100, (item.quantity / (item.threshold * 3)) * 100);

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        p: 2,
        display: "grid",
        gap: 0.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: color }} />
        <Typography variant="body2" color="text.secondary">
          {item.name}
        </Typography>
      </Box>
      <Typography variant="h2">{item.quantity} pcs</Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 6,
          borderRadius: 3,
          bgcolor: palette.divider,
          "& .MuiLinearProgress-bar": { bgcolor: color, borderRadius: 3 },
        }}
      />
      <Typography variant="caption" sx={{ color }}>
        {LABELS[status]}
      </Typography>
    </Box>
  );
}