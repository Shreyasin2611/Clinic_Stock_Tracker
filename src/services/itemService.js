import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

export function subscribeToItems(onData, onError) {
  const q = query(collection(db, "items"), orderBy("name"));
  return onSnapshot(
    q,
    (snapshot) => onData(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  );
}