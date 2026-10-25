import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
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

export function addTest({ name, requiredItems }) {
  return addDoc(collection(db, "tests"), { name, requiredItems });
}

export function updateTest(id, { name, requiredItems }) {
  return updateDoc(doc(db, "tests", id), { name, requiredItems });
}

export function deleteTest(id) {
  return deleteDoc(doc(db, "tests", id));
}