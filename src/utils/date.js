export function getDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseDateKey(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDisplayDate(dateKey) {
  const today = getDateKey();
  const yesterday = getDateKey(new Date(Date.now() - 86400000));

  if (dateKey === today) return "Today";
  if (dateKey === yesterday) return "Yesterday";

  return parseDateKey(dateKey).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}
