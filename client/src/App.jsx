import React, { useEffect } from "react";
import useUserStore from "@/store/user.store.js";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";

import ProtectedRoute from "./components/common/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";

const App = () => {
  const authCheck = useUserStore((s) => s.authCheck);

  useEffect(() => {
    authCheck();
  }, []);

  return (
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
  );
};

export default App;
