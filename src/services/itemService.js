import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
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


async function getTestsUsingItem(itemId) {
  const snapshot = await getDocs(collection(db, "tests"));
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((t) => (t.requiredItems || []).some((r) => r.itemId === itemId));
}

export async function deleteItem(id) {
  const usedBy = await getTestsUsingItem(id);
  if (usedBy.length > 0) {
    const names = usedBy.map((t) => t.name).join(", ");
    throw new Error(`Cannot delete: this item is used by ${names}.`);
  }
  return deleteDoc(doc(db, "items", id));
}