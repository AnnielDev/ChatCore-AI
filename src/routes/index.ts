import { createBrowserRouter } from "react-router";
import App from "@/App";
import Chat from "@/pages/Chat";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [{ index: true, Component: Chat }],
  },
]);
