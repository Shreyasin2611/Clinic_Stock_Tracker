import { useItems } from "../hooks/useItems";
import { useRecentUsage } from "../hooks/useRecentUsage";
import DataState from "../components/common/DataState";
import PageHeader from "../components/common/PageHeader";
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
        <SummaryTable items={items} usage={usage} />
      </DataState>
    </>
  );
}