import React from "react";
import { Route, Routes } from "react-router-dom";
import CheckAuth from "./components/common/CheckAuth";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CheckAuth />}></Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
