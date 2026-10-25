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

export default function TestsTable({ tests, items, onAdd, onEdit, onDelete }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box>
        <Typography variant="h2">Tests</Typography>
        <Typography variant="body2" color="text.secondary">
          Manage the tests and the items each one uses.
        </Typography>
      </Box>
      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
          Add test 
        </Button>
        </Box>

      {tests.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 3 }}>
          No tests yet. Click "Add test" to create the first one.
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
                    <Tooltip title="Edit">
                      <IconButton aria-label={`Edit ${test.name}`} onClick={() => onEdit(test)}>
                        <EditOutlinedIcon />
                      </IconButton>
                    </Tooltip>
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