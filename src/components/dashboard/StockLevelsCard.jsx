import { Box, Paper, Typography } from "@mui/material";
import StockTile from "./StockTile";

export default function StockLevelsCard({ items }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Stock levels
      </Typography>

      {items.length === 0 ? (
        <Typography color="text.secondary">
          No stock items yet. Add items in Manage inventory.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          {items.map((item) => (
            <StockTile key={item.id} item={item} />
          ))}
        </Box>
      )}
    </Paper>
  );
}