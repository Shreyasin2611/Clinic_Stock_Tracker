export function getStatus(quantity, threshold) {
  if (quantity <= threshold) return "low";
  if (quantity <= threshold * 1.3) return "near";
  return "ok";
}