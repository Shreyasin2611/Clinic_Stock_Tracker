import { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";

const INITIAL_SUGGESTION_COUNT = 3;

export default function ReorderListCard({ suggestions, onReceive }) {
  const [busyId, setBusyId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const visibleSuggestions = showAll
    ? suggestions
    : suggestions.slice(0, INITIAL_SUGGESTION_COUNT);

  async function handleClick(suggestion) {
    setBusyId(suggestion.item.id);
    await onReceive(suggestion);
    setBusyId(null);
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Reorder list
      </Typography>

      {suggestions.length === 0 ? (
        <Typography color="text.secondary">Nothing to reorder right now.</Typography>
      ) : (
        <Box sx={{ display: "grid", gap: 1.5 }}>
          {visibleSuggestions.map((s) => (
            <Box
              key={s.item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                px: 2,
                py: 1.5,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {s.item.name}: order {s.order} pcs
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Used {s.used} in the last 15 days. Target {s.target} (usage + safety
                  stock {s.safety}). In stock: {s.item.quantity}.
                </Typography>
              </Box>
              <Button
                variant="outlined"
                onClick={() => handleClick(s)}
                disabled={busyId === s.item.id}
                sx={{ flexShrink: 0 }}
              >
                Mark received
              </Button>
            </Box>
          ))}
        </Box>
      )}
      {suggestions.length > INITIAL_SUGGESTION_COUNT && (
        <Button
          onClick={() => setShowAll((current) => !current)}
          aria-expanded={showAll}
          sx={{ mt: 2 }}
        >
          {showAll ? "Show less" : `View all (${suggestions.length})`}
        </Button>
      )}
    </Paper>
  );
}