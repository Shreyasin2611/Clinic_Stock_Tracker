import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const isWholeNumber = (value) =>
  value !== "" && Number.isInteger(Number(value)) && Number(value) >= 0;

export default function ItemFormDialog({ item, items, onSave, onClose }) {
  const [name, setName] = useState(item?.name ?? "");
  const [quantity, setQuantity] = useState(item?.quantity ?? "");
  const [threshold, setThreshold] = useState(item?.threshold ?? "");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function validate() {
    const found = {};
    const trimmed = name.trim();
    if (!trimmed) {
      found.name = "Item name is required.";
    } else if (
      items.some(
        (i) => i.id !== item?.id && i.name.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      found.name = "An item with this name already exists.";
    }
    if (!isWholeNumber(quantity)) found.quantity = "Enter a whole number, 0 or more.";
    if (!isWholeNumber(threshold)) found.threshold = "Enter a whole number, 0 or more.";
    return found;
  }

  async function handleSave() {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSaving(true);
    await onSave({
      name: name.trim(),
      quantity: Number(quantity),
      threshold: Number(threshold),
    });
    setSaving(false);
  }

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{item ? "Edit stock item" : "Add stock item"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 2, pt: 1 }}>
          <TextField
            label="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
            required
          />
          <TextField
            label="Current quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            error={Boolean(errors.quantity)}
            helperText={errors.quantity}
            required
          />
          <TextField
            label="Alert threshold"
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            error={Boolean(errors.threshold)}
            helperText={errors.threshold || "You get an alert when stock falls to this number."}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} disabled={saving}>
          {item ? "Save changes" : "Add item"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}