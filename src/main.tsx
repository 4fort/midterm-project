import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import routes from "./routes";
import { ThemeProvider } from "./components/providers/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="container mx-auto px-4 py-8 space-y-4">
        <RouterProvider router={routes} />
      </main>
    </ThemeProvider>
  </StrictMode>
);
