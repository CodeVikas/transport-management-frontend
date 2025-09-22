import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// Auth Routes
import AuthRoutes from "./Auth/Login/auth.routes";
import NotFoundPage from "./Auth/NotFoundPage/NotFoundPage";
import DashboardLayout from "./Layout/DashboardLayout";
// Role-based Dashboards
import AdminRoutes from "./pages/Admin/admin.routes";
import ManagerRoutes from "./pages/Manager/manager.routes";
import AccountantRoutes from "./pages/Accountant/accountant.routes";
import CustomerRoutes from "./pages/Customer/customer.routes";
import DriverRoutes from "./pages/Driver/driver.routes";
// Page Blocker
import PageBlocker from "./utils/pageBlocker";

function AppContent() {
  return (
    <PageBlocker>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <DashboardLayout currentRole="Admin">
              <AdminRoutes />
            </DashboardLayout>
          }
        />
        <Route
          path="/manager/*"
          element={
            <DashboardLayout currentRole="Manager">
              <ManagerRoutes />
            </DashboardLayout>
          }
        />

        <Route
          path="/accountant/*"
          element={
            <DashboardLayout currentRole="Accountant">
              <AccountantRoutes />
            </DashboardLayout>
          }
        />
        <Route
          path="/customer/*"
          element={
            <DashboardLayout currentRole="Customer">
              <CustomerRoutes />
            </DashboardLayout>
          }
        />
        <Route
          path="/driver/*"
          element={
            <DashboardLayout currentRole="Driver">
              <DriverRoutes />
            </DashboardLayout>
          }
        />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </PageBlocker>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/*" element={<AppContent />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
