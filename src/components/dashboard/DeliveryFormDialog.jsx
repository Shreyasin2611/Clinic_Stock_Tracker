import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function DeliveryFormDialog({ suggestion, onSave, onClose }) {
  const [quantity, setQuantity] = useState(String(suggestion.order));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave(event) {
    event.preventDefault();
    const amount = Number(quantity);
    if (!Number.isInteger(amount) || amount <= 0) {
      setError("Enter a whole number greater than 0.");
      return;
    }

    setSaving(true);
    const succeeded = await onSave({ suggestion, amount });
    if (!succeeded) setSaving(false);
  }

  return (
    <Dialog
      open
      onClose={saving ? undefined : onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{ paper: { component: "form", onSubmit: handleSave, noValidate: true } }}
    >
      <DialogTitle>Record delivery: {suggestion.item.name}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Suggested delivery: {suggestion.order} pcs. Enter the quantity that actually
          arrived.
        </DialogContentText>
        <TextField
          label="Quantity received"
          type="number"
          value={quantity}
          onChange={(event) => {
            setQuantity(event.target.value);
            setError("");
          }}
          error={Boolean(error)}
          helperText={error}
          inputProps={{ min: 1, step: 1 }}
          required
          fullWidth
          autoFocus
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={saving}>
          {saving ? "Saving..." : "Record delivery"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
