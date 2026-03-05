import React, { useEffect, lazy, Suspense } from "react";
import useAuthStore from "@/store/auth.store.js";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LoadingHeader from "./components/common/LoadingHeader";
import RootLayout from "./pages/RootLayout";
import Workflow from "./pages/Workflow";
import { applyDarkMode } from "./lib/theme.js";
import useUserStore from "./store/user.store";

/* ===== Lazy Imports ===== */
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(
  () => import("./pages/auth/forgot-password/ForgotPassword"),
);

const Home = lazy(() => import("./pages/Home"));
const Landing = lazy(() => import("./pages/Landing"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const authCheck = useAuthStore((s) => s.authCheck);
  const darkMode = useUserStore((s) => s.darkMode);

  console.log(darkMode)

  useEffect(() => {
    authCheck();
  }, []);

  useEffect(() => {

    applyDarkMode(darkMode);
  }, [darkMode]);

  return (
    <Suspense fallback={<LoadingHeader />}>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<RootLayout />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route path="/workflow/:workflowId" element={<Workflow />} />
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
