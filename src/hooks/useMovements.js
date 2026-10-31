import { useEffect, useState } from "react";
import { subscribeToMovements } from "../services/movementService";

export function useMovements() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToMovements(
      (data) => {
        setMovements(data);
        setLoading(false);
      },
      (e) => {
        setError(e.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return { movements, loading, error };
}