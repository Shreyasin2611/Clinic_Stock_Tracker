import {
  CheckCircleOutlined,
  ErrorOutlined,
  Inventory2Outlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SummaryStats({ counts }) {
  const { palette } = useTheme();
  const s = palette.status;
  const cards = [
    {
      label: "Total items",
      value: counts.total,
      color: palette.primary.main,
      background: "#E8F3F1",
      icon: Inventory2Outlined,
    },
    {
      label: "OK",
      value: counts.ok,
      color: s.ok,
      background: s.okBg,
      icon: CheckCircleOutlined,
    },
    {
      label: "Near threshold",
      value: counts.near,
      color: s.near,
      background: s.nearBg,
      icon: WarningAmberOutlined,
    },
    {
      label: "Low",
      value: counts.low,
      color: s.low,
      background: s.lowBg,
      icon: ErrorOutlined,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
        gap: { xs: 2, md: 2.5 },
      }}
    >
      {cards.map(({ label, value, color, background, icon: Icon }) => (
        <Paper
          component="article"
          key={label}
          aria-label={`${label}: ${value}`}
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            minHeight: 128,
            p: { xs: 2, sm: 2.5 },
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            borderTop: `3px solid ${color}`,
            transition: "transform 160ms ease, box-shadow 160ms ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.09)",
            },
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              {label}
            </Typography>
            <Typography
              sx={{
                mt: 1,
                color,
                fontSize: { xs: 32, sm: 36 },
                fontWeight: 700,
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {value}
            </Typography>
          </Box>
          <Box
            aria-hidden="true"
            sx={{
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              width: 48,
              height: 48,
              borderRadius: 2,
              color,
              backgroundColor: background,
            }}
          >
            <Icon sx={{ fontSize: 26 }} />
          </Box>
        </Paper>
      ))}
    </Box>
  );
}