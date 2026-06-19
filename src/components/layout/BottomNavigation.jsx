import { NavLink, useLocation } from "react-router-dom";
import { NAV_ITEMS, isTopLevelPath } from "../../constants/navigation";

export default function BottomNavigation() {
  const { pathname } = useLocation();

  if (!isTopLevelPath(pathname)) return null;

  return (
    <nav className="sticky bottom-0 z-10 rounded-t-3xl bg-surface px-3 pb-3 pt-2 shadow-soft-top">
      <ul className="flex items-center justify-between">
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
          <li key={path} className="flex-1">
            <NavLink
              to={path}
              className="flex flex-col items-center gap-1 py-1.5 text-[11px] font-medium tracking-wide"
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex items-center justify-center rounded-full px-3.5 py-1.5 transition-colors ${
                      isActive ? "bg-moss/12 text-moss" : "text-stone"
                    }`}
                  >
                    <Icon size={19} strokeWidth={isActive ? 2.2 : 1.7} />
                  </span>
                  <span className={isActive ? "text-moss" : "text-stone"}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
