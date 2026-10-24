import {
  Box,
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
import DeleteOutlineIcon from "@mui/icons-material/Delete";

function describeItems(requiredItems, items) {
  if (!requiredItems || requiredItems.length === 0) return "No items";
  return requiredItems
    .map((r) => {
      const item = items.find((i) => i.id === r.itemId);
      return `${r.quantity} ${item ? item.name.toLowerCase() : "unknown item"}`;
    })
    .join(", ");
}

export default function TestsTable({ tests, items, onDelete }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h2">Tests</Typography>
        <Typography variant="body2" color="text.secondary">
          Manage the tests and the items each one uses.
        </Typography>
      </Box>

      {tests.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 3 }}>
          No tests yet.
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Test name</TableCell>
                <TableCell>Required items</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map((test) => (
                <TableRow key={test.id} hover>
                  <TableCell>{test.name}</TableCell>
                  <TableCell>{describeItems(test.requiredItems, items)}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Delete">
                      <IconButton aria-label={`Delete ${test.name}`} onClick={() => onDelete(test)}>
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