import { Box } from "@mui/material";
import { useItems } from "../hooks/useItems";
import { useRecentUsage } from "../hooks/useRecentUsage";
import { getSummaryCounts } from "../utils/stockSummary";
import DataState from "../components/common/DataState";
import PageHeader from "../components/common/PageHeader";
import SummaryStats from "../components/summary/SummaryStats";
import SummaryTable from "../components/summary/SummaryTable";

export default function SummaryPage() {
  const { items, loading: itemsLoading, error: itemsError } = useItems();
  const { usage, loading: usageLoading, error: usageError } = useRecentUsage();

  

  return (
    <>
       <PageHeader title="Stock summary" />
      <DataState
        loading={itemsLoading || usageLoading}
        error={itemsError || usageError}
      >
        <Box sx={{ display: "grid", gap: 3 }}>
          <SummaryStats counts={getSummaryCounts(items)} />
          <SummaryTable items={items} usage={usage} />
        </Box>
        </DataState>
    </>
  );
}