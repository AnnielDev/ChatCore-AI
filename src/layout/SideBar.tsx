import { NavLink } from "react-router";
import { BsChatLeftText } from "react-icons/bs";
import { FaCog } from "react-icons/fa";
import { useI18n } from "@/context/I18nContext";
import { useSettingsModal } from "@/context/SettingsModalContext";

export default function SideBar() {
  const { t } = useI18n();
  const { open } = useSettingsModal();
  const navItems = [{ name: t("nav.chat"), path: "/", icon: BsChatLeftText }];

  return (
    <div className="w-72 h-screen text-white p-4 border-r bg-(--primary-color) border-white/10 shadow-[0_0_40px_-5px_rgba(163,166,255,0.08)] backdrop-blur-3xl z-40 transition-all duration-300 ease-in-out">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">ChatCore AI</h1>
        <button
          type="button"
          onClick={open}
          className="rounded-full border border-white/20 bg-[#121a30]/90 p-2 text-white/80 transition hover:bg-white/10"
          aria-label={t("settings.open")}
          title={t("settings.open")}
        >
          <FaCog className="text-sm" />
        </button>
      </div>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 text-lg hover:backdrop-blur-2xl ease-in duration-200 hover:bg-nav-item rounded-r-full px-6 text-left py-2 block${
                isActive ? " bg-nav-item" : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className="text-xl"
                  color={isActive ? "var(--third-color)" : "white"}
                />
                <span
                  className={isActive ? "text-(--third-color)" : "text-white"}
                >
                  {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
