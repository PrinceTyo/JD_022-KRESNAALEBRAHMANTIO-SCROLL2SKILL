import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/Login/Login";
import RegisterPage from "../pages/Auth/Register/Register";
import DashboardPage from "../pages/Dashboard/Dashboard";
import ActivityPage from "../pages/Activity/Activity";
import TargetPage from "../pages/Target/Target";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import NotFound from "@/pages/NotFound/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/target" element={<TargetPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
