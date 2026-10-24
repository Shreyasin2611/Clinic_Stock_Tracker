import { useEffect, useState } from "react";
import { subscribeToTests } from "../services/testService";

export function useTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToTests(
      (data) => {
        setTests(data);
        setLoading(false);
      },
      (e) => {
        setError(e.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return { tests, loading, error };
}