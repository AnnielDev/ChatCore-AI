import { Outlet } from "react-router";
import SideBar from "@/layout/SideBar";
export default function App() {
  return (
    <div className="flex min-h-dvh flex-col md:h-dvh md:flex-row">
      <SideBar />
      <main className="relative min-h-0 flex-1 bg-(--primary-color)">
        <div className="absolute inset-0 z-5 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(163,166,255,0.05),transparent_50%)]" />
        <div className="relative z-10 h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
