import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function TestFormDialog({ test, tests, items, onSave, onClose }) {
  const [name, setName] = useState(test?.name ?? "");
  const [rows, setRows] = useState(
    test?.requiredItems?.length
      ? test.requiredItems.map((r) => ({ ...r }))
      : [{ itemId: "", quantity: 1 }]
  );
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function updateRow(index, changes) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, ...changes } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, { itemId: "", quantity: 1 }]);
  }

  function removeRow(index) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  function validate() {
    const found = {};
    const trimmed = name.trim();
    if (!trimmed) {
      found.name = "Test name is required.";
    } else if (
      tests.some(
        (t) => t.id !== test?.id && t.name.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      found.name = "A test with this name already exists.";
    }
    if (rows.length === 0) {
      found.items = "Add at least one stock item.";
    } else if (rows.some((r) => !r.itemId)) {
      found.items = "Choose an item for every row.";
    } else if (new Set(rows.map((r) => r.itemId)).size !== rows.length) {
      found.items = "Each item can only be used once per test.";
    }
    return found;
  }

  async function handleSave() {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSaving(true);
    await onSave({
      name: name.trim(),
      requiredItems: rows.map((r) => ({ itemId: r.itemId, quantity: r.quantity })),
    });
    setSaving(false);
  }

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{test ? "Edit test" : "Add test"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 2, pt: 1 }}>
          <TextField
            label="Test name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
            required
          />

          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Required stock items
          </Typography>

          {rows.map((row, index) => (
            <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                select
                label="Item"
                value={row.itemId}
                onChange={(e) => updateRow(index, { itemId: e.target.value })}
                sx={{ flex: 1 }}
              >
                {items.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                }}
              >
                <Button
                  aria-label="Decrease quantity"
                  disabled={row.quantity <= 1}
                  onClick={() => updateRow(index, { quantity: row.quantity - 1 })}
                  sx={{ minWidth: 36, px: 0 }}
                >
                  −
                </Button>
                <Typography sx={{ width: 28, textAlign: "center", fontWeight: 600 }}>
                  {row.quantity}
                </Typography>
                <Button
                  aria-label="Increase quantity"
                  onClick={() => updateRow(index, { quantity: row.quantity + 1 })}
                  sx={{ minWidth: 36, px: 0 }}
                >
                  +
                </Button>
              </Box>

              <IconButton aria-label="Remove item" onClick={() => removeRow(index)}>
                ×
              </IconButton>
            </Box>
          ))}

          {errors.items && <FormHelperText error>{errors.items}</FormHelperText>}

          <Box>
            <Button startIcon={<AddIcon />} onClick={addRow} sx={{ pl: 0 }}>
              Add item
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} disabled={saving}>
          {test ? "Save changes" : "Save test"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}