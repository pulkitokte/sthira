import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { PATHS, PAGE_TITLES, isTopLevelPath } from "../../constants/navigation";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const title = PAGE_TITLES[pathname] ?? "Sthira";
  const topLevel = isTopLevelPath(pathname);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-canvas px-6 py-5">
      {topLevel ? (
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          {title}
        </span>
      ) : (
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="-ml-2 flex items-center gap-1.5 rounded-full px-2 py-1.5 text-moss transition-colors hover:bg-moss/10"
        >
          <ArrowLeft size={19} strokeWidth={2} />
          <span className="font-display text-base font-medium">{title}</span>
        </button>
      )}

      {topLevel && (
        <button
          onClick={() => navigate(PATHS.SETTINGS)}
          aria-label="Settings"
          className="rounded-full p-2 text-stone transition-colors hover:bg-moss/10 hover:text-moss"
        >
          <SettingsIcon size={19} strokeWidth={2} />
        </button>
      )}
    </header>
  );
}
