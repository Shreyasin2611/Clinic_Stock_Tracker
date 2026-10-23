import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Alert, Box, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import { useItems } from "../hooks/useItems";
import StockItemsTable from "../components/inventory/StockItemsTable";

const TABS = ["tests", "stock-items"];

export default function InventoryPage() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { items, loading, error } = useItems();

  if (!TABS.includes(tab)) {
    return <Navigate to="/inventory/tests" replace />;
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
          {!loading && !error && <StockItemsTable items={items} />}
        </>
      )}
    </>
  );
}