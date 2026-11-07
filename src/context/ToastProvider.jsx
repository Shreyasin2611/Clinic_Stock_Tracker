import { useCallback, useMemo, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { ToastContext } from "./ToastContext";

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const showToast = useCallback((message, severity = "success") => {
    setToast({ open: true, message, severity });
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  function handleClose() {
    setToast((t) => ({ ...t, open: false }));
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={toast.severity} variant="filled" onClose={handleClose}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}