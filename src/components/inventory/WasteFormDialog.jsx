import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

export default function WasteFormDialog({ item, onSave, onClose }) {
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("expired");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave(event) {
    event.preventDefault();
    const amount = Number(quantity);
    if (!Number.isInteger(amount) || amount <= 0) {
      setError("Enter a whole number greater than 0.");
      return;
    }
    if (amount > item.quantity) {
      setError(`Only ${item.quantity} pcs are currently in stock.`);
      return;
    }

    setSaving(true);
    try {
      const succeeded = await onSave({ item, amount, reason });
      if (!succeeded) setSaving(false);
    } catch (e) {
      setSaving(false);
      throw e;
    }
  }

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{ paper: { component: "form", onSubmit: handleSave, noValidate: true } }}
    >
      <DialogTitle>Record waste: {item.name}</DialogTitle>
      <DialogContent>
        <TextField
          label="Quantity to remove"
          type="number"
          value={quantity}
          onChange={(event) => {
            setQuantity(event.target.value);
            setError("");
          }}
          error={Boolean(error)}
          helperText={error || `Current stock: ${item.quantity} pcs`}
          inputProps={{ min: 1, max: item.quantity, step: 1 }}
          required
          fullWidth
          sx={{ mt: 1, mb: 2 }}
        />
        <TextField
          select
          label="Reason"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          fullWidth
        >
          <MenuItem value="expired">Expired</MenuItem>
          <MenuItem value="damaged">Damaged</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="error" disabled={saving}>
          {saving ? "Saving..." : "Record waste"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
