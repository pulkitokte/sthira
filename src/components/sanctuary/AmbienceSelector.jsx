// src/components/sanctuary/AmbienceSelector.jsx
// Visual ambience selector. Architecture supports real audio in the future.
// No audio files used — visual cards only.

import { AMBIENCE_OPTIONS } from "../../data/sanctuaryData";

// ── Ambient visual renders ───────────────────────────────────────────────────

function RainVisual({ active }) {
  return (
    <div className="relative w-full h-10 overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 11}%`,
            top: active ? "0%" : "-100%",
            width: 1,
            height: active ? 12 : 0,
            background: "rgba(130,160,200,0.55)",
            borderRadius: 2,
            transition: `all ${0.6 + i * 0.1}s ease`,
            transitionDelay: `${i * 0.06}s`,
          }}
        />
      ))}
    </div>
  );
}

function ForestVisual({ active }) {
  return (
    <div className="relative w-full h-10 flex items-end justify-center gap-1.5 overflow-hidden">
      {[14, 18, 22, 18, 14].map((h, i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: active ? h : 4,
            borderRadius: "40% 40% 10% 10%",
            background: `rgba(${100 + i * 5},${150 + i * 4},${100},${0.4 + i * 0.04})`,
            transition: `all ${0.5 + i * 0.12}s ease`,
            transitionDelay: `${i * 0.07}s`,
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  );
}

function OceanVisual({ active }) {
  return (
    <div className="relative w-full h-10 flex items-end overflow-hidden">
      <div
        style={{
          width: "100%",
          height: active ? 18 : 6,
          borderRadius: "50% 50% 0 0 / 30% 30% 0 0",
          background:
            "linear-gradient(to bottom, rgba(100,170,200,0.35), rgba(60,130,170,0.2))",
          transition: "all 0.8s ease",
        }}
      />
    </div>
  );
}

function NightVisual({ active }) {
  return (
    <div className="relative w-full h-10 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            left: `${12 + i * 14}%`,
            top: `${15 + (i % 2) * 30}%`,
            background: "rgba(200,200,240,0.7)",
            opacity: active ? 1 : 0,
            transition: `opacity ${0.4 + i * 0.1}s ease`,
            transitionDelay: `${i * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}

function SilenceVisual() {
  return (
    <div className="relative w-full h-10 flex items-center justify-center">
      <div
        className="w-8 h-px"
        style={{ background: "rgba(160,150,135,0.4)" }}
      />
    </div>
  );
}

function AmbienceVisual({ visual, active }) {
  switch (visual) {
    case "rain":
      return <RainVisual active={active} />;
    case "forest":
      return <ForestVisual active={active} />;
    case "ocean":
      return <OceanVisual active={active} />;
    case "night":
      return <NightVisual active={active} />;
    case "silence":
      return <SilenceVisual />;
    default:
      return <SilenceVisual />;
  }
}

// ── Main component ───────────────────────────────────────────────────────────

export default function AmbienceSelector({ selected, onSelect }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone">
          Ambience
        </p>
        <p className="text-xs text-stone font-light opacity-60">
          Visual only · audio coming soon
        </p>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {AMBIENCE_OPTIONS.map((opt) => {
          const isActive = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className="flex flex-col items-center gap-2 rounded-2xl p-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                background: isActive ? opt.gradient : "rgba(185,175,160,0.06)",
                border: `1px solid ${isActive ? opt.accentColor : "rgba(185,175,160,0.18)"}`,
              }}
              aria-pressed={isActive}
              aria-label={opt.label}
            >
              {/* Visual */}
              <div className="w-full">
                <AmbienceVisual visual={opt.visual} active={isActive} />
              </div>

              {/* Label */}
              <span
                className="text-xs font-display font-medium transition-colors duration-200"
                style={{ color: isActive ? "#4a5a50" : "#8a8070" }}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected description */}
      {selected && (
        <p className="text-xs text-stone font-light italic text-center opacity-70 transition-all duration-500">
          {AMBIENCE_OPTIONS.find((a) => a.id === selected)?.description ?? ""}
        </p>
      )}
    </div>
  );
}
