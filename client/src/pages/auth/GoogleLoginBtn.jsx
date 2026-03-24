import React from "react";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import useAuthStore from "../../store/auth.store.js";
import { useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";

const GoogleLoginBtn = () => {
  const navigate = useNavigate();
  const googleLogin = useAuthStore((s) => s.googleLogin);

  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await googleLogin(tokenResponse.access_token);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Button
      variant="outline"
      onClick={handleLogin}
      className="w-full flex items-center justify-center gap-3
             bg-white border border-gray-300
             hover:bg-gray-50 hover:shadow-sm
             transition-all duration-200"
    >
      <Globe className="w-5 h-5 text-blue-500" />
      <span className="font-medium text-gray-700">Continue with Google</span>
    </Button>
  );
};

export default GoogleLoginBtn;
