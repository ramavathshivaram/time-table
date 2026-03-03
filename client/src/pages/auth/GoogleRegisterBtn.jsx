import React from "react";
import { Globe } from "lucide-react";
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
    <Button
      onClick={handleRegister}
      className="w-full h-11 flex items-center justify-center gap-3
             bg-white text-gray-700
             border border-gray-300
             rounded-lg
             hover:bg-gray-50 hover:shadow-md
             active:scale-[0.98]
             transition-all duration-200"
    >
      <Globe className="w-5 h-5 text-blue-500" />
      <span className="font-medium">Sign in with Google</span>
    </Button>
  );
};

export default GoogleRegisterBtn;
