import { useState } from "react";
import { Alert, Box, CircularProgress, Snackbar, Typography } from "@mui/material";
import { useItems } from "../hooks/useItems";
import { useTests } from "../hooks/useTests";
import { logTest } from "../services/usageService";
import LogTestCard from "../components/dashboard/LogTestCard";

export default function DashboardPage() {
  const { items, loading: itemsLoading, error: itemsError } = useItems();
  const { tests, loading: testsLoading, error: testsError } = useTests();
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  async function handleConfirm(test) {
    try {
      const used = await logTest(test);
      const text = used.map((u) => `${u.quantity} ${u.name.toLowerCase()}`).join(", ");
      setToast({
        open: true,
        severity: "success",
        message: `Test logged: ${text} used. Stock updated.`,
      });
    } catch (e) {
      setToast({ open: true, severity: "error", message: e.message });
    }
  }

  const loading = itemsLoading || testsLoading;
  const error = itemsError || testsError;

  return (
    <>
      <Typography variant="h1" sx={{ mb: 3 }}>
        Stock dashboard
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <Box sx={{ maxWidth: 628 }}>
          <LogTestCard tests={tests} items={items} onConfirm={handleConfirm} />
        </Box>
      )}

      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
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