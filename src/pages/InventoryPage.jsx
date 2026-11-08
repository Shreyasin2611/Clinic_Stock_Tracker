import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import { useItems } from "../hooks/useItems";
import { useTests } from "../hooks/useTests";
import { useMovements } from "../hooks/useMovements";
import { useToast } from "../hooks/useToast";
import { addItem, deleteItem, updateItem } from "../services/itemService";
import { addTest, deleteTest, updateTest } from "../services/testService";
import { getErrorMessage } from "../utils/errorMessages";
import DataState from "../components/common/DataState";
import PageHeader from "../components/common/PageHeader";
import ConfirmDeleteDialog from "../components/common/ConfirmDeleteDialog";
import StockItemsTable from "../components/inventory/StockItemsTable";
import ItemFormDialog from "../components/inventory/ItemFormDialog";
import TestsTable from "../components/inventory/TestsTable";
import TestFormDialog from "../components/inventory/TestFormDialog";
import MovementsTable from "../components/inventory/MovementsTable";

const TABS = ["tests", "stock-items", "history"];

export default function InventoryPage() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { items, loading: itemsLoading, error: itemsError } = useItems();
  const { tests, loading: testsLoading, error: testsError } = useTests();
  const {
    movements,
    loading: movementsLoading,
    error: movementsError,
  } = useMovements();

  const [itemForm, setItemForm] = useState({ open: false, item: null });
  const [testForm, setTestForm] = useState({ open: false, test: null });
  const [deleteItemTarget, setDeleteItemTarget] = useState(null);
  const [deleteTestTarget, setDeleteTestTarget] = useState(null);
  
  if (!TABS.includes(tab)) {
    return <Navigate to="/inventory/tests" replace />;
  }

   async function handleSaveItem(data) {
    try {
      if (itemForm.item) {
        await updateItem(itemForm.item.id, data);
        showToast("Stock item updated.");
      } else {
        await addItem(data);
        showToast("Stock item added.");
      }
      setItemForm({ open: false, item: null });
    } catch (e) {
      showToast("Could not save: " + getErrorMessage(e), "error");
    }
  }
  
  async function handleDeleteItem() {
    try {
      await deleteItem(deleteItemTarget.id);
      showToast("Stock item deleted.");
    } catch (e) {
      showToast(getErrorMessage(e), "error");
    } finally {
      setDeleteItemTarget(null);
    }
  }

  
  async function handleSaveTest(data) {
    try {
      if (testForm.test) {
        await updateTest(testForm.test.id, data);
        showToast("Test updated.");
      } else {
        await addTest(data);
        showToast("Test added.");
      }
      setTestForm({ open: false, test: null });
    } catch (e) {
      showToast("Could not save: " + getErrorMessage(e), "error");
    }
  }

  
  async function handleDeleteTest() {
    try {
      await deleteTest(deleteTestTarget.id);
      showToast("Test deleted.");
    } catch (e) {
      showToast("Could not delete: " + getErrorMessage(e), "error");
    } finally {
      setDeleteTestTarget(null);
    }
  }

  return (
    <>
      <PageHeader title="Manage inventory" />

      <Tabs
        value={tab}
        onChange={(e, value) => navigate(`/inventory/${value}`)}
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab value="tests" label="Tests" />
        <Tab value="stock-items" label="Stock items" />
        <Tab value="history" label="History" />
      </Tabs>

            {tab === "tests" && (
        
           <DataState
          loading={itemsLoading || testsLoading}
          error={itemsError || testsError}
        >
            <TestsTable
              tests={tests}
              items={items}
              onAdd={() => setTestForm({ open: true, test: null })}
              onEdit={(test) => setTestForm({ open: true, test })}
              onDelete={(test) => setDeleteTestTarget(test)}
            />
            </DataState>
          )}
    
      {tab === "stock-items" && (
        <DataState loading={itemsLoading} error={itemsError}>
          <StockItemsTable  
              items={items}
              onAdd={() => setItemForm({ open: true, item: null })}
              onEdit={(item) => setItemForm({ open: true, item })}
              onDelete={(item) => setDeleteItemTarget(item)}
            />
              </DataState>
      )}

        {tab === "history" && (
      <DataState loading={movementsLoading} error={movementsError}>
          <MovementsTable movements={movements} />
        </DataState>
        )}
  
  {testForm.open && (
        <TestFormDialog
          key={testForm.test?.id ?? "new"}
          test={testForm.test}
          tests={tests}
          items={items}
          onSave={handleSaveTest}
          onClose={() => setTestForm({ open: false, test: null })}
        />
  )}

{itemForm.open && (
        <ItemFormDialog
          key={itemForm.item?.id ?? "new"}
          item={itemForm.item}
          items={items}
          onSave={handleSaveItem}
          onClose={() => setItemForm({ open: false, item: null })}
        />
      )}
      
        <ConfirmDeleteDialog
        open={Boolean(deleteItemTarget)}
        name={deleteItemTarget?.name}
        onConfirm={handleDeleteItem}
        onCancel={() => setDeleteItemTarget(null)}
      />

        <ConfirmDeleteDialog
        open={Boolean(deleteTestTarget)}
        name={deleteTestTarget?.name}
        onConfirm={handleDeleteTest}
        onCancel={() => setDeleteTestTarget(null)}
      />
    </>
  );
}