import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import StockTile from "./StockTile";

const INITIAL_ITEM_COUNT = 6;

export default function StockLevelsCard({ items }) {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, INITIAL_ITEM_COUNT);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Stock levels
      </Typography>

      {items.length === 0 ? (
                <Box sx={{ display: "grid", gap: 2, justifyItems: "start" }}>
          <Typography color="text.secondary">
            No stock items yet. Add your first item to see stock levels here.
          </Typography>
          <Button variant="outlined" component={RouterLink} to="/inventory/stock-items">
            Add stock items
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          {visibleItems.map((item) => (
            <StockTile key={item.id} item={item} />
          ))}
        </Box>
      )}
      {items.length > INITIAL_ITEM_COUNT && (
        <Button
          onClick={() => setShowAll((current) => !current)}
          aria-expanded={showAll}
          sx={{ mt: 2 }}
        >
          {showAll ? "Show less" : `View all (${items.length})`}
        </Button>
      )}
    </Paper>
  );
}