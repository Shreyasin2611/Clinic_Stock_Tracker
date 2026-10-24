import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import StatusBadge from "../common/StatusBadge";
import { getStatus } from "../../utils/stockStatus";

export default function StockItemsTable({ items, onAdd, onEdit }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box>
        <Typography variant="h2">Stock items</Typography>
        <Typography variant="body2" color="text.secondary">
            Manage current quantities and alert thresholds for stock items in the clinic.
        </Typography>
      </Box>
      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
          Add stock item
        </Button>
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
            {items.map((item) => (
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