import { useNavigate } from "react-router-dom";
import { Sunrise, Eye, Droplet, ChevronRight } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import TodaysProgressCard from "../components/tracker/TodaysProgressCard";
import ConsistencyCard from "../components/tracker/ConsistencyCard";
import { useProgress } from "../context/ProgressContext";
import { PATHS } from "../constants/navigation";

export default function Home() {
  const navigate = useNavigate();
  const {
    hasCompletedToday,
    totalCompletedToday,
    currentStreak,
    longestStreak,
  } = useProgress();

  return (
    <PageContainer className="flex flex-col gap-10">
      <section className="rounded-4xl bg-surface p-8 shadow-soft">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
          <Sunrise size={22} className="text-moss" strokeWidth={1.8} />
        </div>

        <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-sage">
          Good morning
        </p>
        <h1 className="mt-2 font-display text-[28px] font-semibold leading-snug text-ink">
          Begin with a little movement
        </h1>
        <p className="mt-3 leading-relaxed text-stone">
          A few gentle minutes before the day takes over. That's all your
          morning routine needs to be.
        </p>

        <button
          onClick={() => navigate(PATHS.LIBRARY)}
          className="mt-6 w-full rounded-full bg-moss py-4 font-display font-semibold tracking-wide text-canvas shadow-soft transition-colors duration-200 hover:bg-moss-dark"
        >
          Start Morning Routine
        </button>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between px-1">
          <h2 className="font-display text-base font-semibold text-ink">
            Today's Progress
          </h2>
          <button
            onClick={() => navigate(PATHS.HISTORY)}
            className="flex items-center gap-1 text-xs font-medium text-stone transition-colors hover:text-moss"
          >
            History <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <TodaysProgressCard
            hasCompletedToday={hasCompletedToday}
            totalCompletedToday={totalCompletedToday}
          />
          <ConsistencyCard
            currentStreak={currentStreak}
            longestStreak={longestStreak}
          />
        </div>
      </section>

      <section>
        <h2 className="px-1 font-display text-base font-semibold text-ink">
          Take a moment
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate(PATHS.EYE_RELAX)}
            className="flex flex-col items-start gap-4 rounded-3xl border border-border bg-surface p-5 text-left shadow-soft transition-transform active:scale-[0.98]"
          >
            <div className="flex w-full items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dew/20">
                <Eye size={18} className="text-dew" strokeWidth={1.8} />
              </span>
              <ChevronRight size={16} className="text-stone/60" />
            </div>
            <span className="font-display text-sm font-medium text-ink">
              Rest your eyes
            </span>
          </button>

          <button
            onClick={() => navigate(PATHS.HYDRATION)}
            className="flex flex-col items-start gap-4 rounded-3xl border border-border bg-surface p-5 text-left shadow-soft transition-transform active:scale-[0.98]"
          >
            <div className="flex w-full items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dew/20">
                <Droplet size={18} className="text-dew" strokeWidth={1.8} />
              </span>
              <ChevronRight size={16} className="text-stone/60" />
            </div>
            <span className="font-display text-sm font-medium text-ink">
              Log some water
            </span>
          </button>
        </div>
      </section>
    </PageContainer>
  );
}
