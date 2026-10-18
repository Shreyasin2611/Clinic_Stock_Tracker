import { doc, writeBatch } from "firebase/firestore";
import { db } from "./firebase";

const items = [
  { id: "syringes", name: "Syringes", quantity: 52, threshold: 20 },
  { id: "gloves", name: "Gloves", quantity: 60, threshold: 20 },
  { id: "tubes", name: "Tubes", quantity: 27, threshold: 20 },
  { id: "reagents", name: "Reagents", quantity: 23, threshold: 15 },
  { id: "needles", name: "Needles", quantity: 32, threshold: 30 },
  { id: "swabs", name: "Swabs", quantity: 5, threshold: 10 },
];

const tests = [
  {
    id: "complete-blood-count",
    name: "Complete Blood Count",
    requiredItems: [
      { itemId: "tubes", quantity: 1 },
      { itemId: "syringes", quantity: 1 },
      { itemId: "needles", quantity: 1 },
    ],
  },
  {
    id: "lipid-profile",
    name: "Lipid Profile",
    requiredItems: [
      { itemId: "tubes", quantity: 1 },
      { itemId: "reagents", quantity: 1 },
    ],
  },
  {
    id: "covid-antigen",
    name: "Covid Antigen",
    requiredItems: [
      { itemId: "swabs", quantity: 1 },
      { itemId: "gloves", quantity: 1 },
    ],
  },
];

export async function seedDatabase() {
  const batch = writeBatch(db);
  items.forEach(({ id, ...data }) => batch.set(doc(db, "items", id), data));
  tests.forEach(({ id, ...data }) => batch.set(doc(db, "tests", id), data));
  await batch.commit();
}