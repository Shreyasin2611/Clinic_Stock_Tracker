import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Box, Button } from "@mui/material";
import { useItems } from "../../hooks/useItems";
import { getStatus } from "../../utils/stockStatus";

export default function AlertBanner() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items } = useItems();
  const low = items.filter((i) => getStatus(i.quantity, i.threshold) === "low");

  if (low.length === 0) return null;

  function handleViewAlerts() {
    if (location.pathname === "/") {
      document
        .getElementById("dashboard-alerts")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { state: { scrollToAlerts: true } });
    }
  }

  return (
    <Box sx={{ maxWidth: 1280, mx: "auto", px: 3, pt: 2 }}>
      <Alert
        severity="error"
        action={
          <Button
            color="inherit"
            size="small"
            onClick={handleViewAlerts}
          >
            View alerts
          </Button>
        }
      >
        Low stock
      </Alert>
    </Box>
  );
}