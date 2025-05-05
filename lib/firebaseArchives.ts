import { db } from "./firebase";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Word } from "@/types";

export const getArchivedWords = async (uid: string): Promise<string[]> => {
  const docRef = doc(db, "userArchives", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().archived || [] : [];
};

export const archiveWordForUser = async (uid: string, hanzi: string) => {
  const docRef = doc(db, "userArchives", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const current = docSnap.data().archived || [];
    if (!current.includes(hanzi)) {
      await updateDoc(docRef, { archived: [...current, hanzi] });
    }
  } else {
    await setDoc(docRef, { archived: [hanzi] });
  }
};
