import React from "react";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import useAuthStore from "../../store/auth.store.js";
import { useNavigate } from "react-router-dom";

const GoogleRegisterBtn = () => {
  const navigate = useNavigate();
  const googleRegister = useAuthStore((s) => s.googleRegister);

  const handleRegister = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await googleRegister(tokenResponse.access_token);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Button variant="outline" className="w-full" onClick={handleRegister}>
      Register with Google
    </Button>
  );
};

export default GoogleRegisterBtn;
