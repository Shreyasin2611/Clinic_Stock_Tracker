import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";

const items = [
  { id: "needle", name: "Needle", quantity: 100, threshold: 30 },
  { id: "syringe-vacutainer", name: "Syringe/Vacutainer", quantity: 100, threshold: 30 },
  { id: "plain-serum-tube", name: "Plain/Serum Tube", quantity: 80, threshold: 25 },
  { id: "edta-tube", name: "EDTA (Purple Top) Tube", quantity: 60, threshold: 20 },
  { id: "fluoride-tube", name: "Fluoride (Grey Top) Tube", quantity: 40, threshold: 15 },
  { id: "gloves", name: "Gloves", quantity: 200, threshold: 50 },
  { id: "spirit-swab", name: "Spirit swab", quantity: 200, threshold: 50 },
  { id: "cotton", name: "Cotton", quantity: 200, threshold: 50 },
  { id: "bandage", name: "Bandage", quantity: 150, threshold: 40 },
  { id: "nasal-swab", name: "Nasal Swab", quantity: 50, threshold: 15 },
  { id: "covid-antigen-kit", name: "COVID Antigen Kit", quantity: 50, threshold: 15 },
  { id: "extraction-buffer", name: "Extraction Buffer", quantity: 50, threshold: 15 },
];

const BLOOD_TEST_BASICS = ["needle", "syringe-vacutainer"];
const BLOOD_TEST_COMMON = ["gloves", "spirit-swab", "cotton", "bandage"];

function bloodTest(id, name, tubeId) {
  return {
    id,
    name,
    requiredItems: [...BLOOD_TEST_BASICS, tubeId, ...BLOOD_TEST_COMMON].map((itemId) => ({
      itemId,
      quantity: 1,
    })),
  };
}

const tests = [
  bloodTest("cbc", "CBC", "edta-tube"),
  bloodTest("lipid-profile", "Lipid Profile", "plain-serum-tube"),
  bloodTest("thyroid-test", "Thyroid Test", "plain-serum-tube"),
  bloodTest("vitamin-d", "Vitamin D (25-OH)", "plain-serum-tube"),
  bloodTest("vitamin-b12", "Vitamin B12", "plain-serum-tube"),
  bloodTest("diabetes-blood-glucose", "Diabetes (Blood Glucose)", "fluoride-tube"),
  bloodTest("hba1c", "HbA1c", "edta-tube"),
  {
    id: "covid-antigen",
    name: "COVID Antigen",
    requiredItems: ["nasal-swab", "covid-antigen-kit", "extraction-buffer", "gloves"].map(
      (itemId) => ({ itemId, quantity: 1 })
    ),
  },
];

async function clearCollection(name) {
  const snapshot = await getDocs(collection(db, name));
  for (let i = 0; i < snapshot.docs.length; i += 400) {
    const batch = writeBatch(db);
    snapshot.docs.slice(i, i + 400).forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }
}

export async function seedDatabase() {
  await clearCollection("stockMovements");
  await clearCollection("tests");
  await clearCollection("items");

  const batch = writeBatch(db);

  items.forEach(({ id, ...data }) => {
    batch.set(doc(db, "items", id), data);
    batch.set(doc(collection(db, "stockMovements")), {
      itemId: id,
      itemName: data.name,
      change: data.quantity,
      quantityAfter: data.quantity,
      reason: "initial",
      createdAt: serverTimestamp(),
    });
  });

  tests.forEach(({ id, ...data }) => batch.set(doc(db, "tests", id), data));

  await batch.commit();
}