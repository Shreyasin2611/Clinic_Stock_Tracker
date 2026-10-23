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

export default function StockItemsTable({ items }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h2">Stock items</Typography>
        <Typography variant="body2" color="text.secondary">
            This table shows the current stock levels of all items in the inventory.
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Current stock</TableCell>
              <TableCell>Alert threshold</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.threshold}</TableCell>
                <TableCell>
                  <StatusBadge status={getStatus(item.quantity, item.threshold)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}