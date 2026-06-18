import { useNavigate } from "react-router-dom";
import { Eye, Droplet } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import { PATHS } from "../constants/navigation";

export default function Home() {
  const navigate = useNavigate();

  return (
    <PageContainer className="flex flex-col gap-8">
      <section className="rounded-3xl bg-surface p-6 shadow-soft">
        <p className="font-display text-sm font-medium uppercase tracking-wide text-sage">
          Today
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-moss">
          Begin your day gently
        </h1>
        <p className="mt-2 leading-relaxed text-stone">
          A few minutes of movement before the day takes over. That's all it
          takes to begin.
        </p>
        <button
          onClick={() => navigate(PATHS.ROUTINE_PLAYER)}
          className="mt-5 w-full rounded-2xl bg-moss py-3 font-display font-semibold text-canvas transition-colors hover:bg-moss-dark"
        >
          Start Morning Routine
        </button>
      </section>

      <section>
        <h2 className="font-display text-base font-semibold text-moss">
          Take a moment
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate(PATHS.EYE_RELAX)}
            className="flex flex-col items-start gap-2 rounded-2xl bg-surface p-4 text-left shadow-soft"
          >
            <Eye className="text-dew" size={20} />
            <span className="font-display text-sm font-medium text-ink">
              Rest your eyes
            </span>
          </button>
          <button
            onClick={() => navigate(PATHS.HYDRATION)}
            className="flex flex-col items-start gap-2 rounded-2xl bg-surface p-4 text-left shadow-soft"
          >
            <Droplet className="text-dew" size={20} />
            <span className="font-display text-sm font-medium text-ink">
              Log some water
            </span>
          </button>
        </div>
      </section>
    </PageContainer>
  );
}
