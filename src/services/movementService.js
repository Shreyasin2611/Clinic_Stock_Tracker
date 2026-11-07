import {
  Timestamp,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

function readMovements(snapshot) {
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data({ serverTimestamps: "estimate" }),
  }));
}

export function subscribeToMovements(onData, onError) {
  const q = query(
    collection(db, "stockMovements"),
    orderBy("createdAt", "desc"),
    limit(50)
  );
  return onSnapshot(q, (snapshot) => onData(readMovements(snapshot)), onError);
}

export function subscribeToRecentUsage(days, onData, onError) {
  const cutoff = Timestamp.fromDate(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
  const q = query(
    collection(db, "stockMovements"),
    where("createdAt", ">=", cutoff),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snapshot) => onData(readMovements(snapshot)), onError);
}