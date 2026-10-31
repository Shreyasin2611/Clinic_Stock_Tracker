import { Link as RouterLink } from "react-router-dom";
import { Alert, Box, Button } from "@mui/material";
import { useItems } from "../../hooks/useItems";
import { getStatus } from "../../utils/stockStatus";

export default function AlertBanner() {
  const { items } = useItems();
  const low = items.filter((i) => getStatus(i.quantity, i.threshold) === "low");

  if (low.length === 0) return null;

  return (
    <Box sx={{ maxWidth: 1280, mx: "auto", px: 3, pt: 2 }}>
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" component={RouterLink} to="/#alerts">
            View alerts
          </Button>
        }
      >
        Low stock
      </Alert>
    </Box>
  );
}