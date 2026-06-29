// src/hooks/useAtmosphere.js
// Derives and exposes the current atmosphere for the Home page.
// Re-derives on mount only — no polling needed for a wellness app.

import { useMemo } from "react";
import { deriveAtmosphere } from "../utils/atmosphereEngine";
import { getTodayEntry } from "../utils/emotionalWeather";

export function useAtmosphere() {
  const atmosphere = useMemo(() => {
    const weatherEntry = getTodayEntry();
    const weatherId = weatherEntry?.weather ?? null;
    return deriveAtmosphere(weatherId);
  }, []);

  return atmosphere;
}
