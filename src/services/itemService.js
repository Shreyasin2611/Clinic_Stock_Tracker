import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

import { db } from "./firebase";

function movementData(itemId, itemName, change, quantityAfter, reason) {
  return { itemId, itemName, change, quantityAfter, reason, createdAt: serverTimestamp() };
}

export function subscribeToItems(onData, onError) {
  const q = query(collection(db, "items"), orderBy("name"));
  return onSnapshot(
    q,
    (snapshot) => onData(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  );
}

export function addItem({ name, quantity, threshold }) {
 const batch = writeBatch(db);
  const itemRef = doc(collection(db, "items"));
  batch.set(itemRef, { name, quantity, threshold });
  if (quantity > 0) {
    batch.set(
      doc(collection(db, "stockMovements")),
      movementData(itemRef.id, name, quantity, quantity, "initial")
    );
  }
  return batch.commit();
}

export function updateItem(id, { name, quantity, threshold }) {
 return runTransaction(db, async (transaction) => {
    const ref = doc(db, "items", id);
    const snap = await transaction.get(ref);
    if (!snap.exists()) {
      throw new Error("This item no longer exists.");
    }
    const oldQuantity = snap.data().quantity;
    transaction.update(ref, { name, quantity, threshold });
    if (quantity !== oldQuantity) {
      transaction.set(
        doc(collection(db, "stockMovements")),
        movementData(id, name, quantity - oldQuantity, quantity, "adjustment")
      );
    }
  });
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


export function receiveStock(id, amount) {
  return runTransaction(db, async (transaction) => {
    const ref = doc(db, "items", id);
    const snap = await transaction.get(ref);
    if (!snap.exists()) {
      throw new Error("This item no longer exists.");
    }
    const { name, quantity } = snap.data();
    const after = quantity + amount;
    transaction.update(ref, { quantity: after });
    transaction.set(
      doc(collection(db, "stockMovements")),
      movementData(id, name, amount, after, "received")
    );
  });
}

export function recordWaste(id, amount, reason) {
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error("Waste quantity must be a whole number greater than 0.");
  }
  if (!["expired", "damaged"].includes(reason)) {
    throw new Error("Choose whether the item was expired or damaged.");
  }

  return runTransaction(db, async (transaction) => {
    const ref = doc(db, "items", id);
    const snap = await transaction.get(ref);
    if (!snap.exists()) {
      throw new Error("This item no longer exists.");
    }

    const { name, quantity } = snap.data();
    if (amount > quantity) {
      throw new Error(`Only ${quantity} pcs are currently in stock.`);
    }

    const after = quantity - amount;
    transaction.update(ref, { quantity: after });
    transaction.set(
      doc(collection(db, "stockMovements")),
      movementData(id, name, -amount, after, reason)
    );
  });
}