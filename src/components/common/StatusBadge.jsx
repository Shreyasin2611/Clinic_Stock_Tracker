import { Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const LABELS = { ok: "OK", near: "Near threshold", low: "Low" };

export default function StatusBadge({ status }) {
  const { palette } = useTheme();
  const s = palette.status;
  const colors = {
    ok: { color: s.ok, bgcolor: s.okBg },
    near: { color: s.near, bgcolor: s.nearBg },
    low: { color: s.low, bgcolor: s.lowBg },
  };

  return (
    <Chip label={LABELS[status]} size="small" sx={{ ...colors[status], fontWeight: 500 }} />
  );
}