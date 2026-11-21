import { useEffect, useState } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { Box } from "@mui/material";
import { useItems } from "../hooks/useItems";
import { useTests } from "../hooks/useTests";
import { useRecentUsage } from "../hooks/useRecentUsage";
import { useToast } from "../hooks/useToast";
import { logTest } from "../services/usageService";
import { receiveStock } from "../services/itemService";
import { getReorderSuggestions } from "../utils/reorder";
import { getErrorMessage } from "../utils/errorMessages";
import DataState from "../components/common/DataState";
import PageHeader from "../components/common/PageHeader";
import StockLevelsCard from "../components/dashboard/StockLevelsCard";
import LogTestCard from "../components/dashboard/LogTestCard";
import AlertsCard from "../components/dashboard/AlertsCard";
import ReorderListCard from "../components/dashboard/ReorderListCard";
import DeliveryFormDialog from "../components/dashboard/DeliveryFormDialog";

export default function DashboardPage() {
  const [deliveryTarget, setDeliveryTarget] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const { items, loading: itemsLoading, error: itemsError } = useItems();
  const { tests, loading: testsLoading, error: testsError } = useTests();
  const { usage, loading: usageLoading, error: usageError } = useRecentUsage();
  const { showToast } = useToast();

  async function handleConfirm(test) {
    try {
      const used = await logTest(test);
      const text = used.map((u) => `${u.quantity} ${u.name.toLowerCase()}`).join(", ");
      showToast(`Test logged: ${text} used. Stock updated.`);
      return true;
    } catch (e) {
      showToast(getErrorMessage(e), "error");
      return false;
    }
  }

  
  async function handleReceive({ suggestion, amount }) {
    try {
      await receiveStock(suggestion.item.id, amount);
      showToast(
        `${suggestion.item.name} received: +${amount} pcs. Stock updated.`
      );
      setDeliveryTarget(null);
      return true;
    } catch (e) {
      showToast(getErrorMessage(e), "error");
      return false;
    }
  }

  const suggestions = getReorderSuggestions(items, usage);
  const loading = itemsLoading || testsLoading || usageLoading;

  useEffect(() => {
    if (location.hash) {
      navigate(`${location.pathname}${location.search}`, {
        replace: true,
        state: null,
      });
      if (navigationType === "POP") window.scrollTo(0, 0);
      return;
    }

    if (!location.state?.scrollToAlerts) return;
    if (navigationType !== "PUSH") {
      navigate(`${location.pathname}${location.search}`, {
        replace: true,
        state: null,
      });
      return;
    }
    if (loading) return;

    document
      .getElementById("dashboard-alerts")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    navigate(`${location.pathname}${location.search}`, {
      replace: true,
      state: null,
    });
  }, [
    location.hash,
    location.pathname,
    location.search,
    location.state,
    loading,
    navigate,
    navigationType,
  ]);
  
  return (
    <>
      <PageHeader title="Stock dashboard" />
      <DataState
        loading={loading}
        error={itemsError || testsError || usageError}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              gridColumn: { xs: "auto", md: "1 / -1" },
              width: { xs: "100%", md: "60%" },
              justifySelf: "center",
              alignSelf: { xs: "start", md: "center" },
            }}
          >
            <LogTestCard tests={tests} items={items} onConfirm={handleConfirm} />
          </Box>
          <StockLevelsCard items={items} />
          <AlertsCard items={items} usage={usage} />
          <ReorderListCard
            suggestions={suggestions}
            onReceive={(suggestion) => setDeliveryTarget(suggestion)}
          />
        </Box>
      </DataState>
      {deliveryTarget && (
        <DeliveryFormDialog
          suggestion={deliveryTarget}
          onSave={handleReceive}
          onClose={() => setDeliveryTarget(null)}
        />
      )}
    </> 
  );
}