import { NavLink } from "react-router";
import { BsChatLeftText } from "react-icons/bs";
import { RiHistoryFill } from "react-icons/ri";
export default function SideBar() {
  const navItems = [
    { name: "Chat", path: "/chat", icon: BsChatLeftText },
    { name: "History", path: "/history", icon: RiHistoryFill },
  ];
  return (
    <div className="w-72 h-screen text-white p-4 border-r bg-(--primary-color) border-white/10 shadow-[0_0_40px_-5px_rgba(163,166,255,0.08)] backdrop-blur-3xl z-40 transition-all duration-300 ease-in-out">
      {/* <h1 className="text-2xl font-bold mb-4 text-(--third-color)">
        ChatCore AI
      </h1> */}
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
