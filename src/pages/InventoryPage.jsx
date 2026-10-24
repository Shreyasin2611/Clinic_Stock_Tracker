import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Alert, Box, CircularProgress, Snackbar, Tab, Tabs, Typography } from "@mui/material";
import { useItems } from "../hooks/useItems";
import { addItem, deleteItem, updateItem } from "../services/itemService";
import StockItemsTable from "../components/inventory/StockItemsTable";
import ItemFormDialog from "../components/inventory/ItemFormDialog";
import ConfirmDeleteDialog from "../components/common/ConfirmDeleteDialog";

const TABS = ["tests", "stock-items"];

export default function InventoryPage() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { items, loading, error } = useItems();
  const [formState, setFormState] = useState({ open: false, item: null });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  
  if (!TABS.includes(tab)) {
    return <Navigate to="/inventory/tests" replace />;
  }

  function showToast(message, severity = "success") {
    setToast({ open: true, message, severity });
  }

   async function handleSave(data) {
    try {
      if (formState.item) {
        await updateItem(formState.item.id, data);
        showToast("Stock item updated.");
      } else {
        await addItem(data);
        showToast("Stock item added.");
      }
      setFormState({ open: false, item: null });
    } catch (e) {
      showToast("Could not save: " + e.message, "error");
    }
  }
  
  async function handleDelete() {
    try {
      await deleteItem(deleteTarget.id);
      showToast("Stock item deleted.");
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setDeleteTarget(null);
    }
  }

  return (
    <>
      <Typography variant="h1" sx={{ mb: 2 }}>
        Manage inventory
      </Typography>

      <Tabs
        value={tab}
        onChange={(e, value) => navigate(`/inventory/${value}`)}
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab value="tests" label="Tests" />
        <Tab value="stock-items" label="Stock items" />
      </Tabs>

      {tab === "tests" && (
        <Typography color="text.secondary"></Typography>
      )}

      {tab === "stock-items" && (
        <>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          {!loading && !error && (
            <StockItemsTable
              items={items}
              onAdd={() => setFormState({ open: true, item: null })}
              onEdit={(item) => setFormState({ open: true, item })}
              onDelete={(item) => setDeleteTarget(item)}
            />
      )}
    </>
)}

{formState.open && (
        <ItemFormDialog
          key={formState.item?.id ?? "new"}
          item={formState.item}
          items={items}
          onSave={handleSave}
          onClose={() => setFormState({ open: false, item: null })}
        />
      )}
      
        <ConfirmDeleteDialog
        open={Boolean(deleteTarget)}
        name={deleteTarget?.name}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() => setToast((t) => ({ ...t, open: false }))}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}