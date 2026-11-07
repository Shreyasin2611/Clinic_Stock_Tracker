import { Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import DashboardPage from "../pages/DashboardPage";
import InventoryPage from "../pages/InventoryPage";
import SummaryPage from "../pages/SummaryPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<PageLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/inventory" element={<Navigate to="/inventory/tests" replace />} />
          <Route path="/inventory/:tab" element={<InventoryPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}