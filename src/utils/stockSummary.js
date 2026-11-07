import { getStatus } from "./stockStatus";

export function getSummaryCounts(items) {
  const counts = { total: items.length, ok: 0, near: 0, low: 0 };
  items.forEach((item) => {
    counts[getStatus(item.quantity, item.threshold)] += 1;
  });
  return counts;
}

export function getDaysLeft(quantity, dailyUsage) {
  if (dailyUsage <= 0) return null;
  return Math.floor(quantity / dailyUsage);
}