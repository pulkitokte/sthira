import { Sunrise, Wind, Droplet, Eye, Leaf, CheckCircle2 } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import SthiraLogo from "../components/common/SthiraLogo";
import PillarListItem from "../components/about/PillarListItem";
import AppHighlights from "../components/about/AppHighlights";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { APP_VERSION, APP_TAGLINE } from "../constants/app";

const PILLARS = [
  {
    icon: Sunrise,
    title: "Morning Movement",
    description: "A few gentle minutes to begin the day before it takes over.",
    accent: "moss",
  },
  {
    icon: Wind,
    title: "Study Break Recovery",
    description: "Short, guided pauses to recover between study sessions.",
    accent: "dew",
  },
  {
    icon: Droplet,
    title: "Hydration",
    description:
      "A calm, guilt-free way to remember to drink water through the day.",
    accent: "dew",
  },
  {
    icon: Eye,
    title: "Eye Recovery",
    description:
      "Easing the strain that builds from hours of reading and screens.",
    accent: "dew",
  },
  {
    icon: Leaf,
    title: "Wellness Reflection",
    description:
      "A quiet daily check-in with your energy, focus, stress, and mood.",
    accent: "moss",
  },
];

const PHILOSOPHY_POINTS = [
  "Calm over intense — movement that fits into a tired or busy day.",
  "Consistency over achievement — no streak guilt, no missed-day penalties.",
  "Whole-day wellness — support that extends beyond a morning workout.",
  "Private by design — everything stays on your device, nothing is tracked or shared.",
];

export default function AboutSthira() {
  useDocumentTitle("About");

  return (
    <PageContainer className="flex flex-col gap-8">
      <section className="flex flex-col items-center gap-4 rounded-4xl bg-surface p-8 text-center shadow-soft">
        <SthiraLogo size={72} iconSize={32} />
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">
            Sthira
          </h1>
          <p className="mt-1 text-sm text-stone">{APP_TAGLINE}</p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="px-1 font-display text-base font-semibold text-ink">
          Highlights
        </h2>
        <AppHighlights />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="px-1 font-display text-base font-semibold text-ink">
          What is Sthira?
        </h2>
        <div className="rounded-3xl border border-border bg-surface p-5">
          <p className="leading-relaxed text-stone">
            Sthira is a wellness and movement companion for students, UPSC and
            competitive exam aspirants, and anyone who spends long hours sitting
            and studying. It's built around one simple habit — a few minutes of
            morning movement — with gentle support for your body and mind
            through the rest of the day.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="px-1 font-display text-base font-semibold text-ink">
          Core Pillars
        </h2>
        <div className="flex flex-col gap-3">
          {PILLARS.map((pillar) => (
            <PillarListItem key={pillar.title} {...pillar} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="px-1 font-display text-base font-semibold text-ink">
          Design Philosophy
        </h2>
        <div className="rounded-3xl border border-border bg-surface p-5">
          <ul className="space-y-2.5">
            {PHILOSOPHY_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-sm leading-relaxed text-stone"
              >
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 text-sage"
                  strokeWidth={1.8}
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="px-1 font-display text-base font-semibold text-ink">
          Version
        </h2>
        <div className="rounded-3xl border border-border bg-surface p-5 text-center">
          <p className="font-display text-sm font-semibold text-ink">
            Sthira v{APP_VERSION}
          </p>
          <p className="mt-1 text-xs text-stone">
            Built with React, Vite, and Tailwind CSS
          </p>
          <p className="mt-1 text-xs text-stone">
            All data stays on your device
          </p>
        </div>
      </section>
    </PageContainer>
  );
}
