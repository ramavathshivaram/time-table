import React from "react";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import useAuthStore from "../../store/auth.store.js";
import { useNavigate } from "react-router-dom";

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
    <Button variant="outline" className="w-full" onClick={handleLogin}>
      Login with Google
    </Button>
  );
};

export default GoogleLoginBtn;
