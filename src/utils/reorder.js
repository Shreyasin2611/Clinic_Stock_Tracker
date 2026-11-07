import { getAlerts } from "./stockAlerts";

export const REORDER_DAYS = 15;

export function getUsedInWindow(movements, itemId) {
  return movements
    .filter((m) => m.reason === "test" && m.itemId === itemId)
    .reduce((sum, m) => sum + Math.abs(m.change), 0);
}

export function getDailyUsage(movements, itemId, days = REORDER_DAYS) {
  return getUsedInWindow(movements, itemId) / days;
}

export function getReorderSuggestions(items, movements) {
  return getAlerts(items).map(({ item, status }) => {
    const used = getUsedInWindow(movements, item.id);
    const safety = Math.ceil(item.threshold * 1.5);
    const target = used + safety;
    const order = Math.max(1, target - item.quantity);
    return { item, status, used, safety, target, order };
  });
}