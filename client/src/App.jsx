import React, { useEffect, lazy, Suspense } from "react";
import useUserStore from "@/store/user.store.js";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";

/* ===== Lazy Imports ===== */
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() =>
  import("./pages/auth/forgot-password/ForgotPassword")
);

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const authCheck = useUserStore((s) => s.authCheck);

  useEffect(() => {
    authCheck();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;