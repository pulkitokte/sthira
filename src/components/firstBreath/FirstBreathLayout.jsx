// src/components/firstBreath/FirstBreathLayout.jsx
// Full-screen, chrome-free shell for First Breath screens.
// Phase 5: forwards an optional settled prop, alongside the existing
// awakened prop, to the ambient background. Defaults unchanged.

import FirstBreathAmbientBackground from "./FirstBreathAmbientBackground";

export default function FirstBreathLayout({
  children,
  awakened = false,
  settled = false,
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <FirstBreathAmbientBackground awakened={awakened} settled={settled} />
      {children}
    </div>
  );
}
