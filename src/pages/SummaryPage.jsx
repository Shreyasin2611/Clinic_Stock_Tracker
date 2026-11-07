import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useItems } from "../hooks/useItems";
import { useRecentUsage } from "../hooks/useRecentUsage";
import { getSummaryCounts } from "../utils/stockSummary";
import SummaryStats from "../components/summary/SummaryStats";
import SummaryTable from "../components/summary/SummaryTable";

export default function SummaryPage() {
  const { items, loading: itemsLoading, error: itemsError } = useItems();
  const { usage, loading: usageLoading, error: usageError } = useRecentUsage();

  const loading = itemsLoading || usageLoading;
  const error = itemsError || usageError;

  return (
    <>
      <Typography variant="h1" sx={{ mb: 3 }}>
        Stock summary
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <Box sx={{ display: "grid", gap: 3 }}>
          <SummaryStats counts={getSummaryCounts(items)} />
          <SummaryTable items={items} usage={usage} />
        </Box>
      )}
    </>
  );
}