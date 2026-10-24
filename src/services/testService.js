import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./firebase";

export function subscribeToTests(onData, onError) {
  const q = query(collection(db, "tests"), orderBy("name"));
  return onSnapshot(
    q,
    (snapshot) => onData(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  );
}

export function deleteTest(id) {
  return deleteDoc(doc(db, "tests", id));
}