import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/shared/layouts/navbar/Navbar";
import { userService } from "@/shared/user/user.service";

const MainLayout = () => {
  useEffect(() => {
    userService.getCurrentUser();
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className="pt-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
