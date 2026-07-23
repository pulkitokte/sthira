// src/components/firstBreath/FirstBreathLayout.jsx
// Full-screen, chrome-free shell for The First Breath.
// Simplified: takes the current timeline `stage` id directly and
// derives the ambient background's subtle response internally.
// FirstBreathAmbientBackground/FirstBreathParticles are unchanged —
// same awakened/settled prop shape they already supported.

import FirstBreathAmbientBackground from "./FirstBreathAmbientBackground";

export default function FirstBreathLayout({ children, stage = null }) {
  const awakened = stage === "leaves" || stage === "logo";
  const settled = stage === "logo";

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <FirstBreathAmbientBackground awakened={awakened} settled={settled} />
      {children}
    </div>
  );
}
