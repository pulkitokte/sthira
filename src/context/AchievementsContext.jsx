import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useProgress } from "./ProgressContext";
import { useRecoveryProgress } from "./RecoveryProgressContext";
import { useEyeRecoveryProgress } from "./EyeRecoveryProgressContext";
import { useWellness } from "./WellnessContext";
import { useHydration } from "./HydrationContext";
import {
  ACHIEVEMENTS,
  ACHIEVEMENTS_STORAGE_KEY,
} from "../constants/achievements";
import { evaluateAllAchievements } from "../utils/achievementEvaluator";

const AchievementsContext = createContext(null);

export function AchievementsProvider({ children }) {
  const { completions: routineCompletions, longestStreak } = useProgress();
  const { completions: recoveryCompletions } = useRecoveryProgress();
  const { completions: eyeCompletions } = useEyeRecoveryProgress();
  const { entries: wellnessEntries } = useWellness();
  const { dailyTotals: hydrationDailyTotals, goal: hydrationGoal } =
    useHydration();

  // Persisted: { [id]: { unlockedAt: ISO string } }
  const [unlockedRecords, setUnlockedRecords] = useLocalStorage(
    ACHIEVEMENTS_STORAGE_KEY,
    {},
  );

  // Session-only banner queue: array of achievement ids to show one at a time
  const [bannerQueue, setBannerQueue] = useState([]);

  // Tracks which achievements were unlocked as of the previous effect run.
  // Initialised to null so the very first run (app open) skips the banner —
  // achievements already earned in previous sessions should not trigger it.
  const prevUnlockedRef = useRef(null);

  const appData = useMemo(
    () => ({
      routineCompletions,
      recoveryCompletions,
      eyeCompletions,
      wellnessEntries,
      hydrationDailyTotals,
      hydrationGoal,
      longestStreak,
    }),
    [
      routineCompletions,
      recoveryCompletions,
      eyeCompletions,
      wellnessEntries,
      hydrationDailyTotals,
      hydrationGoal,
      longestStreak,
    ],
  );

  // Evaluate achievements, persist new unlocks, queue banner for newly earned ones
  useEffect(() => {
    const achievementIds = ACHIEVEMENTS.map((a) => a.id);
    const results = evaluateAllAchievements(achievementIds, appData);
    const now = new Date().toISOString();

    const currentlyUnlocked = new Set(
      achievementIds.filter((id) => results[id].unlocked),
    );
    const prevUnlocked = prevUnlockedRef.current;

    // Persist any unlocked achievements that aren't in the stored records yet
    const toAdd = achievementIds.filter((id) => results[id].unlocked);
    if (toAdd.length > 0) {
      setUnlockedRecords((prev) => {
        const updated = { ...prev };
        let changed = false;
        for (const id of toAdd) {
          if (!prev[id]) {
            updated[id] = { unlockedAt: now };
            changed = true;
          }
        }
        return changed ? updated : prev;
      });
    }

    // Show banner only for achievements that unlocked *this run* — not on first run
    if (prevUnlocked !== null) {
      const newlyUnlocked = achievementIds.filter(
        (id) => results[id].unlocked && !prevUnlocked.has(id),
      );
      if (newlyUnlocked.length > 0) {
        setBannerQueue((q) => [...q, ...newlyUnlocked]);
      }
    }

    prevUnlockedRef.current = currentlyUnlocked;
  }, [appData]); // eslint-disable-line react-hooks/exhaustive-deps

  const dismissBanner = () => setBannerQueue((q) => q.slice(1));

  const resetAchievements = () => setUnlockedRecords({});

  const value = useMemo(() => {
    const achievementIds = ACHIEVEMENTS.map((a) => a.id);
    const evaluationResults = evaluateAllAchievements(achievementIds, appData);

    const unlockedCount = Object.keys(unlockedRecords).length;
    const totalCount = ACHIEVEMENTS.length;

    const recentEntry = Object.entries(unlockedRecords).sort(
      (a, b) => new Date(b[1].unlockedAt) - new Date(a[1].unlockedAt),
    )[0];

    const recentAchievementId = recentEntry?.[0] ?? null;
    const recentAchievement = recentAchievementId
      ? (ACHIEVEMENTS.find((a) => a.id === recentAchievementId) ?? null)
      : null;
    const recentAchievementUnlockedAt = recentEntry?.[1]?.unlockedAt ?? null;

    const currentBannerAchievement = bannerQueue[0]
      ? (ACHIEVEMENTS.find((a) => a.id === bannerQueue[0]) ?? null)
      : null;

    return {
      unlockedRecords,
      evaluationResults,
      unlockedCount,
      totalCount,
      recentAchievement,
      recentAchievementUnlockedAt,
      currentBannerAchievement,
      dismissBanner,
      resetAchievements,
    };
  }, [unlockedRecords, appData, bannerQueue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AchievementsContext.Provider value={value}>
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  const ctx = useContext(AchievementsContext);
  if (!ctx)
    throw new Error(
      "useAchievements must be used within an AchievementsProvider",
    );
  return ctx;
}
