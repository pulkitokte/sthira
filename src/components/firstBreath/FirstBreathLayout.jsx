// src/components/firstBreath/FirstBreathLayout.jsx
// Full-screen, chrome-free shell for First Breath screens.
// Phase 4: forwards an optional awakened prop to the ambient background
// so it can respond subtly once the Awakening stage begins. Default
// (awakened omitted) is unchanged from Phase 2/3.

import FirstBreathAmbientBackground from "./FirstBreathAmbientBackground";

export default function FirstBreathLayout({ children, awakened = false }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <FirstBreathAmbientBackground awakened={awakened} />
      {children}
    </div>
  );
}
