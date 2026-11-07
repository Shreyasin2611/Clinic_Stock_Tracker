import { useEffect, useState } from "react";
import { subscribeToRecentUsage } from "../services/movementService";
import { REORDER_DAYS } from "../utils/reorder";

export function useRecentUsage(days = REORDER_DAYS) {
  const [usage, setUsage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToRecentUsage(
      days,
      (data) => {
        setUsage(data);
        setLoading(false);
      },
      (e) => {
        setError(e.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [days]);

  return { usage, loading, error };
}