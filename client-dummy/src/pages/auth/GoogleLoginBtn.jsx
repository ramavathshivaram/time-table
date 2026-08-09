import React from "react";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import useAuthStore from "../../store/auth.store.js";
import { useNavigate } from "react-router-dom";
import googleLogo from "../../assets/google.png";

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
      className="w-full flex items-center justify-center gap-3 border border-gray-300
             hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
    >
      <img src={googleLogo} alt="Continue with Googl" className="h-15" />
    </Button>
  );
};

export default GoogleLoginBtn;
