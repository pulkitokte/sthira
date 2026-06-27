// src/components/garden/GardenVisual.jsx
// Pure React + CSS garden visual.
// Grows organically as gratitude entries increase.
// No canvas, no external libraries.
// Maximum 50 visible elements regardless of total count.

import { useMemo } from "react";
import {
  GARDEN_ELEMENTS,
  MAX_GARDEN_ELEMENTS,
} from "../../data/gratitudeGardenData";

// ── Individual garden element renderers ─────────────────────────────────────

function LeafRound({ color, size, opacity }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50% 50% 50% 10%",
        background: color,
        opacity,
        transform: "rotate(-30deg)",
      }}
    />
  );
}

function LeafLong({ color, size, opacity }) {
  return (
    <div
      style={{
        width: size * 0.5,
        height: size * 1.4,
        borderRadius: "50% 50% 30% 30%",
        background: color,
        opacity,
        transform: "rotate(15deg)",
      }}
    />
  );
}

function PetalSoft({ color, size, opacity }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50% 10% 50% 10%",
        background: color,
        opacity,
        transform: "rotate(45deg)",
      }}
    />
  );
}

function Bloom({ color, size, opacity }) {
  return (
    <div className="relative" style={{ width: size, height: size, opacity }}>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <div
          key={deg}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: size * 0.38,
            height: size * 0.38,
            borderRadius: "50%",
            background: color,
            transform: `rotate(${deg}deg) translateY(-${size * 0.28}px) translate(-50%, -50%)`,
            transformOrigin: "0 0",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: size * 0.3,
          height: size * 0.3,
          borderRadius: "50%",
          background: "#e8d8a0",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

function Sprout({ color, size, opacity }) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 24 28"
      fill="none"
      style={{ opacity }}
    >
      <line
        x1="12"
        y1="28"
        x2="12"
        y2="12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse
        cx="7"
        cy="10"
        rx="6"
        ry="4"
        fill={color}
        opacity="0.8"
        transform="rotate(-20 7 10)"
      />
      <ellipse
        cx="17"
        cy="8"
        rx="6"
        ry="4"
        fill={color}
        opacity="0.65"
        transform="rotate(20 17 8)"
      />
    </svg>
  );
}

function GardenElement({ type, color, size, opacity }) {
  switch (type) {
    case "leaf-round":
      return <LeafRound color={color} size={size} opacity={opacity} />;
    case "leaf-long":
      return <LeafLong color={color} size={size} opacity={opacity} />;
    case "petal-soft":
      return <PetalSoft color={color} size={size} opacity={opacity} />;
    case "bloom":
      return <Bloom color={color} size={size} opacity={opacity} />;
    case "sprout":
      return <Sprout color={color} size={size} opacity={opacity} />;
    default:
      return <LeafRound color={color} size={size} opacity={opacity} />;
  }
}

// ── Deterministic position generator ────────────────────────────────────────
// Uses a seeded pseudo-random approach so positions are stable across renders.

function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generatePositions(count) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    positions.push({
      left: 4 + seededRandom(i * 3 + 0) * 88, // 4–92%
      top: 8 + seededRandom(i * 3 + 1) * 80, // 8–88%
      size: 14 + seededRandom(i * 3 + 2) * 18, // 14–32px
      opacity: 0.45 + seededRandom(i * 3 + 3) * 0.45, // 0.45–0.9
      rotate: Math.floor(seededRandom(i * 3 + 4) * 360),
    });
  }
  return positions;
}

// ── Main component ───────────────────────────────────────────────────────────

export default function GardenVisual({ totalCount }) {
  const visibleCount = Math.min(totalCount, MAX_GARDEN_ELEMENTS);

  const elements = useMemo(() => {
    const positions = generatePositions(visibleCount);
    return positions.map((pos, i) => {
      const def = GARDEN_ELEMENTS[i % GARDEN_ELEMENTS.length];
      return { ...pos, ...def, key: i };
    });
  }, [visibleCount]);

  // Garden fills progressively — height grows with entries
  const gardenHeight = Math.max(180, Math.min(280, 180 + visibleCount * 2));

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl"
      style={{
        height: gardenHeight,
        background:
          "linear-gradient(to bottom, rgba(134,159,138,0.06) 0%, rgba(185,160,120,0.08) 100%)",
        border: "1px solid rgba(134, 159, 138, 0.18)",
      }}
      aria-label={`Garden with ${totalCount} gratitude moments`}
      role="img"
    >
      {/* Ground line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 rounded-b-3xl"
        style={{
          background:
            "linear-gradient(to top, rgba(134,159,138,0.12), transparent)",
        }}
      />

      {/* Garden elements */}
      {elements.map((el) => (
        <div
          key={el.key}
          className="absolute"
          style={{
            left: `${el.left}%`,
            top: `${el.top}%`,
            transform: `rotate(${el.rotate}deg)`,
            transition: "all 0.6s ease",
          }}
        >
          <GardenElement
            type={el.type}
            color={el.color}
            size={el.size}
            opacity={el.opacity}
          />
        </div>
      ))}

      {/* Empty garden hint */}
      {visibleCount === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xs text-stone font-light italic opacity-50">
            Your garden will grow here
          </p>
        </div>
      )}

      {/* Count overflow note */}
      {totalCount > MAX_GARDEN_ELEMENTS && (
        <div className="absolute bottom-2 right-3">
          <p className="text-xs text-stone font-light opacity-50">
            +{totalCount - MAX_GARDEN_ELEMENTS} more
          </p>
        </div>
      )}
    </div>
  );
}
