import {
  Box,
  Button,
  FormControl,
  IconButton,
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
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import StatusBadge from "../common/StatusBadge";
import { getStatus } from "../../utils/stockStatus";

const STATUS_ORDER = {
  low: { low: 0, near: 1, ok: 2 },
  ok: { ok: 0, near: 1, low: 2 },
};

export default function StockItemsTable({ items, onAdd, onEdit, onDelete }) {
  const [sortOrder, setSortOrder] = useState("low");
  const sortedItems = [...items].sort((a, b) => {
    const statusDifference =
      STATUS_ORDER[sortOrder][getStatus(a.quantity, a.threshold)] -
      STATUS_ORDER[sortOrder][getStatus(b.quantity, b.threshold)];

    return statusDifference || a.name.localeCompare(b.name);
  });

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box>
          <Typography variant="h2">Stock items</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage current quantities and alert thresholds for stock items in the clinic.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="stock-sort-label">Sort by status</InputLabel>
            <Select
              labelId="stock-sort-label"
              value={sortOrder}
              label="Sort by status"
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <MenuItem value="low">Low → Near → OK</MenuItem>
              <MenuItem value="ok">OK → Near → Low</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
          Add stock item
          </Button>
        </Box>
      </Box>

     {items.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 3 }}>
          No stock items yet. Click "Add stock item" to create the first one.
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
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedItems.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.threshold}</TableCell>
                <TableCell>
                  <StatusBadge status={getStatus(item.quantity, item.threshold)} />
                </TableCell>
                <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton aria-label={`Edit ${item.name}`} onClick={() => onEdit(item)}>
                        <EditOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton aria-label={`Delete ${item.name}`} onClick={() => onDelete(item)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
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