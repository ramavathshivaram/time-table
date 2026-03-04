import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useUserStore from "@/store/user.store.js";
import Navbar from "@/components/layouts/Navbar";
import LoadingHeader from "@/components/common/LoadingHeader";

const RootLayout = () => {
  const fetchUser = useUserStore((s) => s.fetchUser);


  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

 
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className="pt-10">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
