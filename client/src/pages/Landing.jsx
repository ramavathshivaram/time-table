import React, { useEffect } from "react";
import useUserStore from "../store/user.store.js";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return <div>Landing</div>;
};

export default Landing;
