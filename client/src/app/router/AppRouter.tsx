import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

// import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

// import { MainLayout } from "@/layouts/MainLayout";
import { AuthLayout } from "@/layouts/AuthLayout";

// const LoginPage = lazy(() => import("@/pages/LoginPage"));
// const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
// const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));

// const HomePage = lazy(() => import("@/pages/HomePage"));
// const TemplatesPage = lazy(() => import("@/pages/TemplatesPage"));
// const WorkflowPage = lazy(() => import("@/pages/WorkflowPage"));
// const LandingPage = lazy(() => import("@/pages/LandingPage"));
// const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          {/* {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />  */}
        </Route>
      </Route>

      {/* Public landing page */}
      {/* <Route path="/" element={<LandingPage />} /> */}

      {/* Protected routes */}
      {/* <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/templates" element={<TemplatesPage />} />
        </Route>

        <Route path="/workflow/:workflowId" element={<WorkflowPage />} />
      </Route> */}

      {/* 404 */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}
