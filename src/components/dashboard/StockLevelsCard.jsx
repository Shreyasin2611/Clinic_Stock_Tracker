import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@mui/material";
import StockTile from "./StockTile";

export default function StockLevelsCard({ items }) {
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
          {items.map((item) => (
            <StockTile key={item.id} item={item} />
          ))}
        </Box>
      )}
    </Paper>
  );
}