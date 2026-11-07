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
import StatusBadge from "../common/StatusBadge";
import { getStatus } from "../../utils/stockStatus";
import { getDailyUsage, getUsedInWindow, REORDER_DAYS } from "../../utils/reorder";
import { getDaysLeft } from "../../utils/stockSummary";

const RANK = { low: 0, near: 1, ok: 2 };

export default function SummaryTable({ items, usage }) {
  const rows = items
    .map((item) => {
      const status = getStatus(item.quantity, item.threshold);
      const used = getUsedInWindow(usage, item.id);
      const daysLeft = getDaysLeft(item.quantity, getDailyUsage(usage, item.id));
      return { item, status, used, daysLeft };
    })
    .sort(
      (a, b) =>
        RANK[a.status] - RANK[b.status] || a.item.name.localeCompare(b.item.name)
    );

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h2">All items</Typography>
        <Typography variant="body2" color="text.secondary">
          Items that need attention are listed first. Days left is based on the average
          daily usage of the last {REORDER_DAYS} days.
        </Typography>
      </Box>

      {rows.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 3 }}>
          No stock items yet.
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Current stock</TableCell>
                <TableCell>Alert threshold</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Used ({REORDER_DAYS} days)</TableCell>
                <TableCell>Days left</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(({ item, status, used, daysLeft }) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.threshold}</TableCell>
                  <TableCell>
                    <StatusBadge status={status} />
                  </TableCell>
                  <TableCell>{used}</TableCell>
                  <TableCell>
                    {daysLeft === null ? "No recent usage" : `${daysLeft} days`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}