// src/hooks/useCalmSounds.js
// Manages all Calm Sounds Sanctuary state.
// Audio via HTML Audio API. Persistence via calmSoundsStorage utilities.
// All audio, timer, and UI state in one hook — no logic in components.

import { useState, useCallback, useRef, useEffect } from "react";
import { getSoundById, SLEEP_TIMER_OPTIONS } from "../data/calmSounds";
import {
  loadCalmSoundsPrefs,
  saveCalmSoundsPrefs,
} from "../utils/calmSoundsStorage";

export const SOUNDS_VIEW = {
  HOME: "home", // Sound selection grid
  PLAYER: "player", // Active player
};

export function useCalmSounds() {
  const prefs = loadCalmSoundsPrefs();

  const [view, setView] = useState(SOUNDS_VIEW.HOME);
  const [activeSound, setActive] = useState(
    prefs.lastSoundId ? getSoundById(prefs.lastSoundId) : null,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(prefs.volume ?? 0.8);
  const [isMuted, setIsMuted] = useState(prefs.isMuted ?? false);

  // Sleep timer state
  const [timerSeconds, setTimerSeconds] = useState(null); // null = no timer
  const [timerRemaining, setTimerRemaining] = useState(null);
  const [timerActive, setTimerActive] = useState(false);

  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // ── Audio setup ──────────────────────────────────────────────────────────

  const ensureAudio = useCallback(
    (sound) => {
      if (!audioRef.current || audioRef.current.dataset.soundId !== sound.id) {
        // Clean up previous
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = "";
        }
        const audio = new Audio(sound.src);
        audio.loop = true;
        audio.volume = isMuted ? 0 : volume;
        audio.dataset.soundId = sound.id;
        audioRef.current = audio;
      }
      return audioRef.current;
    },
    [volume, isMuted],
  );

  // Sync volume changes to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // ── Navigation ────────────────────────────────────────────────────────────

  const openSound = useCallback((sound) => {
    setActive(sound);
    setView(SOUNDS_VIEW.PLAYER);
    saveCalmSoundsPrefs({ lastSoundId: sound.id });
  }, []);

  const goHome = useCallback(() => {
    // Keep audio playing when navigating back to grid
    setView(SOUNDS_VIEW.HOME);
  }, []);

  // ── Playback ──────────────────────────────────────────────────────────────

  const play = useCallback(() => {
    if (!activeSound) return;
    const audio = ensureAudio(activeSound);
    audio.play().catch(() => {
      // Autoplay may be blocked — user must interact first
    });
    setIsPlaying(true);
  }, [activeSound, ensureAudio]);

  const pause = useCallback(() => {
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Switch to a different sound
  const switchSound = useCallback(
    (sound) => {
      const wasPlaying = isPlaying;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      setActive(sound);
      setIsPlaying(false);
      saveCalmSoundsPrefs({ lastSoundId: sound.id });

      if (wasPlaying) {
        // Auto-play the new sound after a tiny delay for state to settle
        setTimeout(() => {
          const audio = new Audio(sound.src);
          audio.loop = true;
          audio.volume = isMuted ? 0 : volume;
          audio.dataset.soundId = sound.id;
          audioRef.current = audio;
          audio.play().catch(() => {});
          setIsPlaying(true);
        }, 50);
      }
    },
    [isPlaying, volume, isMuted],
  );

  // ── Volume ────────────────────────────────────────────────────────────────

  const setVolume = useCallback(
    (val) => {
      const v = Math.max(0, Math.min(1, val));
      setVolumeState(v);
      if (audioRef.current) audioRef.current.volume = isMuted ? 0 : v;
      saveCalmSoundsPrefs({ volume: v });
    },
    [isMuted],
  );

  const toggleMute = useCallback(() => {
    const next = !isMuted;
    setIsMuted(next);
    if (audioRef.current) audioRef.current.volume = next ? 0 : volume;
    saveCalmSoundsPrefs({ isMuted: next });
  }, [isMuted, volume]);

  // ── Sleep timer ───────────────────────────────────────────────────────────

  const startTimer = useCallback((seconds) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerSeconds(seconds);
    setTimerRemaining(seconds);
    setTimerActive(true);

    timerRef.current = setInterval(() => {
      setTimerRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timerRef.current);
          // Stop playback
          if (audioRef.current) audioRef.current.pause();
          setIsPlaying(false);
          setTimerActive(false);
          setTimerRemaining(null);
          setTimerSeconds(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const cancelTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerActive(false);
    setTimerRemaining(null);
    setTimerSeconds(null);
  }, []);

  // ── Formatted timer display ───────────────────────────────────────────────

  const formattedTimer =
    timerRemaining !== null
      ? `${Math.floor(timerRemaining / 60)}:${String(timerRemaining % 60).padStart(2, "0")}`
      : null;

  return {
    // State
    view,
    activeSound,
    isPlaying,
    volume,
    isMuted,
    timerActive,
    timerRemaining,
    timerSeconds,
    formattedTimer,
    // Actions
    openSound,
    goHome,
    togglePlay,
    play,
    pause,
    switchSound,
    setVolume,
    toggleMute,
    startTimer,
    cancelTimer,
    setView,
  };
}
