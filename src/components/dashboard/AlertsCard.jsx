import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getAlerts } from "../../utils/stockAlerts";

export default function AlertsCard({ items }) {
  const { palette } = useTheme();
  const s = palette.status;
  const styles = {
    low: { dot: s.low, bg: s.lowBg, title: "Low stock" },
    near: { dot: s.near, bg: s.nearBg, title: "Near threshold" },
  };
  const alerts = getAlerts(items);

  return (
    <Paper id="dashboard-alerts" sx={{ p: 3, scrollMarginTop: 16 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Alerts
      </Typography>

      {alerts.length === 0 ? (
        <Typography color="text.secondary">
          All items are above their thresholds.
        </Typography>
      ) : (
        <Box sx={{ display: "grid", gap: 1.5 }}>
          {alerts.map(({ item, status }) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1.5,
                borderRadius: 2,
                bgcolor: styles[status].bg,
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: styles[status].dot,
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {styles[status].title}: {item.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.quantity} pcs left (threshold {item.threshold})
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
}