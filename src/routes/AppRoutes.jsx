import { Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import DashboardPage from "../pages/DashboardPage";
import InventoryPage from "../pages/InventoryPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/inventory" element={<Navigate to="/inventory/tests" replace />} />
        <Route path="/inventory/:tab" element={<InventoryPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}