import "./wdyr";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import App from "./App.jsx";

import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

const googleClient = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={googleClient}>
        <App />
        <Toaster position="top-right" richColors duration={2000} />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
