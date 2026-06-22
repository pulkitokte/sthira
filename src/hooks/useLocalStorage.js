import { useCallback, useEffect, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => readStorage(key, defaultValue));

  const update = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        writeStorage(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  // Keeps state in sync if the same key changes from another browser tab
  // or window — e.g. resetting data in Settings in one tab while another
  // tab has the app open. The 'storage' event only fires in other
  // tabs/windows, never the one that made the change, so there's no risk
  // of a feedback loop here.
  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key !== key) return;
      setValue(
        event.newValue !== null ? readStorage(key, defaultValue) : defaultValue,
      );
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, update];
}
