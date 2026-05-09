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
    <aside className="w-full border-b border-white/10 bg-(--primary-color) p-4 text-white shadow-[0_0_40px_-5px_rgba(163,166,255,0.08)] backdrop-blur-3xl transition-all duration-300 ease-in-out md:h-dvh md:w-72 md:border-b-0 md:border-r">
      <div className="mb-4 flex items-center justify-between gap-4 md:mb-6">
        <h1 className="text-xl font-bold text-white md:text-2xl">ChatCore AI</h1>
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
      <nav className="flex gap-3 overflow-x-auto pb-1 md:flex-col md:gap-4 md:overflow-visible md:pb-0">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex min-w-max items-center gap-3 rounded-full px-4 py-2 text-left text-base transition duration-200 hover:bg-nav-item hover:backdrop-blur-2xl md:w-full md:rounded-r-full md:rounded-l-none md:px-6 md:text-lg ${
                isActive ? "bg-nav-item" : ""
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
    </aside>
  );
}
