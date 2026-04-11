import { createBrowserRouter } from "react-router";
import App from "@/App";
import Chat from "@/pages/Chat";
import History from "@/pages/History";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, path: "/chat", Component: Chat },
      { path: "/history", Component: History },
    ],
  },
]);
