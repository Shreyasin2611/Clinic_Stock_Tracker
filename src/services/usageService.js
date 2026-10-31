import { collection, doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function logTest(test) {
  const usedItems = [];

  await runTransaction(db, async (transaction) => {
    usedItems.length = 0;

    const refs = test.requiredItems.map((r) => doc(db, "items", r.itemId));
    const snaps = await Promise.all(refs.map((ref) => transaction.get(ref)));

    snaps.forEach((snap, i) => {
      const needed = test.requiredItems[i].quantity;
      if (!snap.exists()) {
        throw new Error("An item used by this test no longer exists.");
      }
      const { name, quantity } = snap.data();
      if (quantity < needed) {
        throw new Error(`Not enough ${name}: ${quantity} left, ${needed} needed.`);
      }
      usedItems.push({
        itemId: snap.id,
        name,
        quantity: needed,
        after: quantity - needed,
      });
    });

    usedItems.forEach((used, i) => {
      transaction.update(refs[i], { quantity: used.after });
      transaction.set(doc(collection(db, "stockMovements")), {
        itemId: used.itemId,
        itemName: used.name,
        change: -used.quantity,
        quantityAfter: used.after,
        reason: "test",
        testId: test.id,
        testName: test.name,
        createdAt: serverTimestamp(),
      });
    });
  });

  return usedItems;
}