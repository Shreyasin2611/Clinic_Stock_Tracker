import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";

export function subscribeToItems(onData, onError) {
  const q = query(collection(db, "items"), orderBy("name"));
  return onSnapshot(
    q,
    (snapshot) => onData(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  );
}

export function addItem({ name, quantity, threshold }) {
  return addDoc(collection(db, "items"), { name, quantity, threshold });
}

export function updateItem(id, { name, quantity, threshold }) {
  return updateDoc(doc(db, "items", id), { name, quantity, threshold });
}