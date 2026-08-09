import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/shared/ui/sonner";

import { QueryProvider } from "./providers/QueryProvider";
import { GoogleProvider } from "./providers/GoogleProvider";
import { AppRouter } from "./router/AppRouter";

export default function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <GoogleProvider>
          <AppRouter />

          <Toaster position="top-right" richColors duration={2000} />
        </GoogleProvider>
      </BrowserRouter>
    </QueryProvider>
  );
}
