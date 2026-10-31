import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

export function subscribeToMovements(onData, onError) {
  const q = query(
    collection(db, "stockMovements"),
    orderBy("createdAt", "desc"),
    limit(50)
  );
  return onSnapshot(
    q,
    (snapshot) =>
      onData(
        snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data({ serverTimestamps: "estimate" }),
        }))
      ),
    onError
  );
}