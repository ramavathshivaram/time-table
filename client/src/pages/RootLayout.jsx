import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useUserStore from "@/store/user.store.js";
import Navbar from "@/components/layouts/Navbar";

const RootLayout = () => {
  const fetchUser = useUserStore((s) => s.fetchUser);
  const darkMode = useUserStore((s) => s.darkMode);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const html = document.documentElement;

    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
