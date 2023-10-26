import firebase from "firebase/compat/app";
import { collection, addDoc } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { db } from "@components/firebase";

const addData = async (e: any) => {
  e.preventDefault();

  try {
    const docRef = await addDoc(
      collection(db, "incomingCorrespondenceDocuments"),
      {
        correspondence: { x: "dv" },
      }
    );
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export { addData };
