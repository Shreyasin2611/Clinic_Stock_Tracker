import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

function describeReason(movement) {
  if (movement.reason === "test") return `Test: ${movement.testName}`;
  if (movement.reason === "adjustment") return "Manual adjustment";
  if (movement.reason === "initial") return "Initial stock";
  return movement.reason;
}

function formatTime(createdAt) {
  return createdAt ? createdAt.toDate().toLocaleString("en-GB") : "Just now";
}

export default function MovementsTable({ movements }) {
  const { palette } = useTheme();

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h2">Stock history</Typography>
        <Typography variant="body2" color="text.secondary">
          The 50 most recent changes to stock.
        </Typography>
      </Box>

      {movements.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 3 }}>
          No stock changes yet. Log a test on the dashboard to see the first one.
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
              {movements.map((m) => (
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