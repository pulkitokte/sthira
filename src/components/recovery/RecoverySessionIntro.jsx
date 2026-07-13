import { Clock, Layers, CheckCircle2 } from "lucide-react";
import PageContainer from "../layout/PageContainer";
import FeatureHeader from "../layout/FeatureHeader";

export default function RecoverySessionIntro({
  session,
  categoryLabel,
  onBegin,
}) {
  return (
    <>
      <FeatureHeader title={session.title} />
      <PageContainer className="flex flex-1 flex-col">
        <div className="flex-1">
          <p className="leading-relaxed text-stone">{session.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-stone">
              <Clock size={13} strokeWidth={2} />
              {session.duration} min
            </span>
            {categoryLabel && (
              <span className="rounded-full bg-dew/15 px-3 py-1 text-xs font-medium text-dew">
                {categoryLabel}
              </span>
            )}
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-surface p-5">
            <div className="mb-3 flex items-center gap-2">
              <Layers size={16} className="text-moss" strokeWidth={1.8} />
              <p className="font-display text-sm font-semibold text-ink">
                What this helps with
              </p>
            </div>
            <ul className="space-y-2">
              {session.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2 text-sm text-stone"
                >
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 text-sage"
                    strokeWidth={1.8}
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={onBegin}
          className="w-full rounded-full bg-moss py-4 font-display font-semibold tracking-wide text-canvas shadow-soft transition-colors duration-200 hover:bg-moss-dark"
        >
          Begin Session
        </button>
      </PageContainer>
    </>
  );
}
