import React from "react";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import useUserStore from "../../store/user.store.js";
import { useNavigate } from "react-router-dom";

const GoogleRegisterBtn = () => {
   const navigate = useNavigate();
  const googleRegister = useUserStore((s) => s.googleRegister);

  const handleRegister = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await googleRegister(tokenResponse.access_token);
        navigate("/dashboard");
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
