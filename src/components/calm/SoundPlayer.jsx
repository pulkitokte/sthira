// src/components/calm/SoundPlayer.jsx
// The full sound player screen — emoji, controls, volume, sleep timer.
// Pure CSS animations. No Framer Motion.

import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import FeatureHeader from "../layout/FeatureHeader";
import PulseRing from "./PulseRing";
import SleepTimer from "./SleepTimer";

export default function SoundPlayer({
  sound,
  isPlaying,
  volume,
  isMuted,
  timerActive,
  timerSeconds,
  formattedTimer,
  onTogglePlay,
  onSetVolume,
  onToggleMute,
  onStartTimer,
  onCancelTimer,
  onBack,
}) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: sound.playerBg }}
    >
      <FeatureHeader title={sound.title} onBack={onBack} />

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-10 flex flex-col items-center gap-10">
        {/* Emoji with pulse ring */}
        <div className="pt-4">
          <PulseRing isPlaying={isPlaying} color={sound.accentColor}>
            <span style={{ fontSize: "2.8rem", lineHeight: 1 }}>
              {sound.emoji}
            </span>
          </PulseRing>
        </div>

        {/* Title + description */}
        <div className="text-center space-y-2 max-w-xs">
          <h3
            className="font-display text-2xl font-light"
            style={{ color: sound.textColor }}
          >
            {sound.title}
          </h3>
          <p className="text-sm text-stone font-light leading-relaxed">
            {sound.description}
          </p>
          <p className="text-xs text-stone font-light opacity-50 tracking-wide">
            {sound.durationLabel}
          </p>
        </div>

        {/* Play / Pause */}
        <button
          onClick={onTogglePlay}
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            background: sound.accentColor,
            boxShadow: isPlaying
              ? `0 4px 20px ${sound.accentColor}`
              : "0 2px 8px rgba(0,0,0,0.1)",
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={24} strokeWidth={1.5} color="#fff" />
          ) : (
            <Play size={24} strokeWidth={1.5} color="#fff" className="ml-1" />
          )}
        </button>

        {/* Volume control */}
        <div className="w-full max-w-xs space-y-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMute}
              className="shrink-0 p-1.5 rounded-xl text-stone hover:text-ink transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX size={18} strokeWidth={1.5} />
              ) : (
                <Volume2 size={18} strokeWidth={1.5} />
              )}
            </button>

            {/* Slider */}
            <div className="flex-1 relative h-6 flex items-center">
              <div
                className="absolute h-1.5 rounded-full left-0 right-0"
                style={{ background: "rgba(185,175,160,0.25)" }}
              />
              <div
                className="absolute h-1.5 rounded-full left-0"
                style={{
                  width: `${(isMuted ? 0 : volume) * 100}%`,
                  background: sound.accentColor,
                  transition: "width 0.1s ease",
                }}
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (isMuted && val > 0) onToggleMute();
                  onSetVolume(val);
                }}
                className="absolute w-full h-full opacity-0 cursor-pointer"
                aria-label="Volume"
              />
            </div>

            <span className="shrink-0 text-xs text-stone font-light w-8 text-right tabular-nums">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>
        </div>

        {/* Sleep timer */}
        <div className="w-full max-w-xs">
          <SleepTimer
            timerActive={timerActive}
            timerSeconds={timerSeconds}
            formattedTimer={formattedTimer}
            onStart={onStartTimer}
            onCancel={onCancelTimer}
          />
        </div>

        <div className="pb-8" />
      </div>
    </div>
  );
}
