import { useState } from "react";
import { Box, Button, Chip, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function LogTestCard({ tests, items, onConfirm }) {
  const { palette } = useTheme();
  const [testId, setTestId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selected = tests.find((t) => t.id === testId);

  async function handleConfirm() {
    setSubmitting(true);
    await onConfirm(selected);
    setSubmitting(false);
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Log a test
      </Typography>

      {tests.length === 0 ? (
        <Typography color="text.secondary">
          No tests yet. Add a test in Manage inventory first.
        </Typography>
      ) : (
        <Box sx={{ display: "grid", gap: 2 }}>
          <TextField
            select
            label="Test"
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
          >
            {tests.map((test) => (
              <MenuItem key={test.id} value={test.id}>
                {test.name}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, minHeight: 32 }}>
            {selected?.requiredItems.map((r) => {
              const item = items.find((i) => i.id === r.itemId);
              return (
                <Chip
                  key={r.itemId}
                  label={`${r.quantity} ${item ? item.name.toLowerCase() : "unknown item"}`}
                  size="small"
                  sx={{
                    color: palette.status.ok,
                    bgcolor: palette.status.okBg,
                    fontWeight: 500,
                  }}
                />
              );
            })}
          </Box>

          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={!selected || submitting}
          >
            {submitting ? "Logging..." : "Confirm test"}
          </Button>
        </Box>
      )}
    </Paper>
  );
}