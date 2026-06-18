import { NavLink, useLocation } from "react-router-dom";
import { NAV_ITEMS, isTopLevelPath } from "../../constants/navigation";

export default function BottomNavigation() {
  const { pathname } = useLocation();

  if (!isTopLevelPath(pathname)) return null;

  return (
    <nav className="sticky bottom-0 z-10 border-t border-sage/20 bg-canvas">
      <ul className="flex items-center justify-between px-3 py-2">
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
          <li key={path} className="flex-1">
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-medium transition-colors ${
                  isActive ? "text-moss" : "text-stone"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
