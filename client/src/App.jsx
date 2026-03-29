import React, { useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LoadingHeader from "./components/common/LoadingHeader";
import RootLayout from "./pages/RootLayout";
import { applyDarkMode } from "./lib/theme.js";
import useUserStore from "./store/user.store";
import AuthInitializer from "@/components/common/AuthInitializer";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(
  () => import("./pages/auth/forgot-password/ForgotPassword"),
);

const Home = lazy(() => import("./pages/Home"));
const Templates = lazy(() => import("./pages/Templates"));
const Workflow = lazy(() => import("./pages/Workflow"));
const Landing = lazy(() => import("./pages/Landing"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const darkMode = useUserStore((s) => s.darkMode);

  useEffect(() => {
    applyDarkMode(darkMode);
  }, [darkMode]);

  return (
    <Suspense fallback={<LoadingHeader />}>
      <Routes>
        <Route element={<AuthInitializer />}>
          <Route path="/" element={<Landing />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<RootLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/templates" element={<Templates />} />
            </Route>

            <Route path="/workflow/:workflowId" element={<Workflow />} />
          </Route>
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
