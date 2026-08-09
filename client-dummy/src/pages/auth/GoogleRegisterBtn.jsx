import React from "react";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import useAuthStore from "../../store/auth.store.js";
import { useNavigate } from "react-router-dom";
import googleLogo from "../../assets/google.png";

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
    <Button
      onClick={handleRegister}
      className="w-full flex items-center justify-center gap-3 border border-gray-300
             hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
    >
      <img src={googleLogo} alt="Continue with Googl" className="h-15" />
    </Button>
  );
};

export default GoogleRegisterBtn;
