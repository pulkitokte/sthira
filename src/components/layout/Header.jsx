import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { PATHS, PAGE_TITLES, isTopLevelPath } from "../../constants/navigation";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const title = PAGE_TITLES[pathname] ?? "Sthira";
  const topLevel = isTopLevelPath(pathname);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-sage/20 bg-canvas px-5 py-4">
      {topLevel ? (
        <span className="font-display text-lg font-semibold text-moss">
          {title}
        </span>
      ) : (
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex items-center gap-1 text-moss"
        >
          <ArrowLeft size={20} />
          <span className="font-display text-base font-medium">{title}</span>
        </button>
      )}

      {topLevel && (
        <button
          onClick={() => navigate(PATHS.SETTINGS)}
          aria-label="Settings"
          className="text-stone transition-colors hover:text-moss"
        >
          <SettingsIcon size={20} />
        </button>
      )}
    </header>
  );
}
