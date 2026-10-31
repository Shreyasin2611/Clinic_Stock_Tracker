import { getStatus } from "./stockStatus";

const RANK = { low: 0, near: 1 };

export function getAlerts(items) {
  return items
    .map((item) => ({ item, status: getStatus(item.quantity, item.threshold) }))
    .filter((alert) => alert.status !== "ok")
    .sort(
      (a, b) =>
        RANK[a.status] - RANK[b.status] || a.item.name.localeCompare(b.item.name)
    );
}