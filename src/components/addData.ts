import { collection, addDoc } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {db} from "@components/firebase";

const addTodo = async (e: any) => {
    e.preventDefault();

    try {
        const docRef = await addDoc(collection(db, "todos"), {
            // correspondence: newDocement,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}