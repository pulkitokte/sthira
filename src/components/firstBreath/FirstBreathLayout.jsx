// src/components/firstBreath/FirstBreathLayout.jsx
// Full-screen, chrome-free shell for First Breath screens — no Header,
// no BottomNavigation, same treatment already given to Onboarding.
// Phase 1: layout structure only, no final visual styling.

export default function FirstBreathLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-canvas px-6 text-center">
      {children}
    </div>
  );
}
