import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

function describeReason(movement) {
  if (movement.reason === "test") return `Test: ${movement.testName}`;
  if (movement.reason === "adjustment") return "Manual adjustment";
  if (movement.reason === "initial") return "Initial stock";
  if (movement.reason === "received") return "Stock received";
  if (movement.reason === "expired") return "Waste: expired";
  if (movement.reason === "damaged") return "Waste: damaged";
  return movement.reason;
}

function formatTime(createdAt) {
  return createdAt ? createdAt.toDate().toLocaleString("en-GB") : "Just now";
}

export default function MovementsTable({ movements }) {
  const [reasonFilter, setReasonFilter] = useState("all");
  const { palette } = useTheme();
  const filteredMovements =
    reasonFilter === "all"
      ? movements
      : movements.filter((movement) => movement.reason === reasonFilter);

  return (
    <Paper sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h2">Stock history</Typography>
          <Typography variant="body2" color="text.secondary">
            The 50 most recent changes to stock.
          </Typography>
        </Box>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="history-reason-filter-label">Filter by reason</InputLabel>
          <Select
            labelId="history-reason-filter-label"
            id="history-reason-filter"
            value={reasonFilter}
            label="Filter by reason"
            onChange={(event) => setReasonFilter(event.target.value)}
          >
            <MenuItem value="all">All reasons</MenuItem>
            <MenuItem value="test">Test</MenuItem>
            <MenuItem value="expired">Expired</MenuItem>
            <MenuItem value="damaged">Damaged</MenuItem>
            <MenuItem value="adjustment">Manual adjustment</MenuItem>
            <MenuItem value="initial">Initial stock</MenuItem>
            <MenuItem value="received">Stock received</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {movements.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 3 }}>
          No stock changes yet. Log a test on the dashboard to see the first one.
        </Typography>
      ) : filteredMovements.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 3 }}>
          No stock changes found for this reason.
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Change</TableCell>
                <TableCell>Stock after</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMovements.map((m) => (
                <TableRow key={m.id} hover>
                  <TableCell>{formatTime(m.createdAt)}</TableCell>
                  <TableCell>{m.itemName}</TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: m.change > 0 ? palette.status.ok : "text.primary",
                    }}
                  >
                    {m.change > 0 ? `+${m.change}` : m.change}
                  </TableCell>
                  <TableCell>{m.quantityAfter}</TableCell>
                  <TableCell>{describeReason(m)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}