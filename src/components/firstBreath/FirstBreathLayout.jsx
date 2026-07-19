// src/components/firstBreath/FirstBreathLayout.jsx
// Full-screen, chrome-free shell for First Breath screens.
// Phase 2: now hosts the ambient background behind all content.
// Structure/positioning only changed as much as necessary to make room
// for the new backdrop — no changes to how children are rendered.

import FirstBreathAmbientBackground from "./FirstBreathAmbientBackground";

export default function FirstBreathLayout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <FirstBreathAmbientBackground />
      {children}
    </div>
  );
}
