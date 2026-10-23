import { useEffect, useState } from "react";
import { subscribeToItems } from "../services/itemService";

export function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToItems(
      (data) => {
        setItems(data);
        setLoading(false);
      },
      (e) => {
        setError(e.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return { items, loading, error };
}