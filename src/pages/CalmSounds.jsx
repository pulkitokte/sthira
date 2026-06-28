// src/pages/CalmSounds.jsx
// Calm Sounds Sanctuary — ambient sound selection grid and player.
// Audio via HTML Audio API. Pure CSS animations. No external audio libraries.

import { useNavigate } from "react-router-dom";
import { ChevronLeft, Music } from "lucide-react";
import { useCalmSounds, SOUNDS_VIEW } from "../hooks/useCalmSounds";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import SoundCard from "../components/calm/SoundCard";
import SoundPlayer from "../components/calm/SoundPlayer";
import { CALM_SOUNDS } from "../data/calmSounds";

export default function CalmSounds() {
  const navigate = useNavigate();
  const sounds = useCalmSounds();
  useDocumentTitle("Calm Sounds");

  const {
    view,
    activeSound,
    isPlaying,
    volume,
    isMuted,
    timerActive,
    timerSeconds,
    formattedTimer,
    openSound,
    goHome,
    togglePlay,
    setVolume,
    toggleMute,
    startTimer,
    cancelTimer,
    switchSound,
  } = sounds;

  // ── Player view ───────────────────────────────────────────────────────────
  if (view === SOUNDS_VIEW.PLAYER && activeSound) {
    return (
      <SoundPlayer
        sound={activeSound}
        isPlaying={isPlaying}
        volume={volume}
        isMuted={isMuted}
        timerActive={timerActive}
        timerSeconds={timerSeconds}
        formattedTimer={formattedTimer}
        onTogglePlay={togglePlay}
        onSetVolume={setVolume}
        onToggleMute={toggleMute}
        onStartTimer={startTimer}
        onCancelTimer={cancelTimer}
        onBack={goHome}
      />
    );
  }

  // ── Sound selection grid ──────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #faf8f4 0%, #f7f4ef 50%, #faf8f4 100%)",
      }}
    >
      {/* Ambient orb */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 380,
            height: 380,
            top: "-10%",
            right: "-14%",
            background:
              "radial-gradient(circle, rgba(185,175,160,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 280,
            height: 280,
            bottom: "12%",
            left: "-8%",
            background:
              "radial-gradient(circle, rgba(134,159,138,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-10 px-4 pt-12 pb-4"
        style={{
          background: "rgba(250,248,244,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(185,175,160,0.12)",
        }}
      >
        <div className="max-w-lg mx-auto flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-xl transition-all"
            style={{ color: "#8a8070" }}
            aria-label="Go back"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <h1
            className="font-display font-light text-ink tracking-tight"
            style={{ fontSize: "1.2rem" }}
          >
            Calm Sounds
          </h1>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="relative max-w-lg mx-auto px-4 py-8 space-y-8 pb-20">
        {/* Intro */}
        <div className="space-y-2">
          <p
            className="font-display font-light text-ink leading-snug"
            style={{ fontSize: "1.1rem" }}
          >
            A soundscape for wherever you are.
          </p>
          <p className="text-sm text-stone font-light leading-relaxed">
            Choose a sound and allow the world to soften for a while.
          </p>
        </div>

        {/* Currently playing banner — visible when audio is active */}
        {activeSound && (
          <div
            className="rounded-2xl p-4 flex items-center justify-between gap-3"
            style={{
              background: activeSound.gradient,
              border: `1px solid ${activeSound.cardBorder}`,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl leading-none">{activeSound.emoji}</span>
              <div>
                <p
                  className="font-display text-sm font-medium"
                  style={{ color: activeSound.textColor }}
                >
                  {activeSound.title}
                </p>
                <p className="text-xs text-stone font-light opacity-70 mt-0.5">
                  {isPlaying ? "Now playing" : "Paused"}
                </p>
              </div>
            </div>
            <button
              onClick={() => openSound(activeSound)}
              className="text-xs font-display font-medium px-3 py-1.5 rounded-full transition-opacity hover:opacity-80"
              style={{
                background: activeSound.accentColor,
                color: "#fff",
              }}
            >
              Open
            </button>
          </div>
        )}

        {/* Sound grid */}
        <div className="space-y-3">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-70 px-1">
            Soundscapes
          </p>
          <div className="flex flex-col gap-2.5">
            {CALM_SOUNDS.map((sound) => (
              <SoundCard
                key={sound.id}
                sound={sound}
                isActive={activeSound?.id === sound.id}
                isPlaying={isPlaying && activeSound?.id === sound.id}
                onSelect={(s) => {
                  // If tapping the active sound, open its player
                  // If tapping a different sound, switch to it
                  if (activeSound?.id === s.id) {
                    openSound(s);
                  } else {
                    switchSound(s);
                    openSound(s);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-stone font-light italic opacity-40 pt-2">
          Audio files play from your device. No streaming required.
        </p>
      </div>
    </div>
  );
}
