import { Alert, Box } from "@mui/material";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

export default function OfflineBanner() {
  const online = useOnlineStatus();

  if (online) return null;

  return (
    <Box sx={{ maxWidth: 1280, mx: "auto", px: 3, pt: 2 }}>
      <Alert severity="warning">
        You are offline. Stock changes cannot be saved until the connection is back.
      </Alert>
    </Box>
  );
}