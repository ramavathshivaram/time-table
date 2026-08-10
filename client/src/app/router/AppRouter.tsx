import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import LoadingHeader from "../../shared/components/LoadingHeader";
import NotFoundPage from "@/pages/NotFoundPage";

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));

const LandingPage = lazy(() => import("@/pages/LandingPage"));

const TimetablesPage = lazy(() => import("@/pages/TimetablesPage"));

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingHeader />}>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/register" element={<RegisterPage />} />

            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/timetables" element={<TimetablesPage />} />
            {/* /timetables/:id
              /timetables/:id/designer  */}
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
