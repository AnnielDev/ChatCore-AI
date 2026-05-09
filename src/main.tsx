import "./styles/main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "@/routes";
import { I18nProvider } from "@/context/I18nContext";
import { SettingsModalProvider } from "@/context/SettingsModalContext";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <SettingsModalProvider>
        <RouterProvider router={router} />
      </SettingsModalProvider>
    </I18nProvider>
  </StrictMode>,
);
