import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "./firebase";

const db = getFirestore();

export const loadArchivedWords = async (): Promise<Set<string>> => {
  const user = auth.currentUser;
  if (!user) return new Set();

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  const data = snap.exists() ? snap.data().archives || [] : [];
  return new Set(data);
};

export const updateArchivedWords = async (archives: Set<string>) => {
  const user = auth.currentUser;
  if (!user) return;
  const ref = doc(db, "users", user.uid);
  await setDoc(ref, { archives: Array.from(archives) }, { merge: true });
};
