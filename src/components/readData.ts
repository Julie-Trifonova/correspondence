import { useEffect, useState } from "react";

import { db } from "@components/firebase";
import { collection, getDocs } from "firebase/firestore";

const readData = () => {
  const [todos, setTodos] = useState([]);

  const fetchPost = async () => {
    await getDocs(collection(db, "incomingCorrespondenceDocuments")).then(
      (querySnapshot) => {
        const newData: any = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTodos(newData);
        // return todos
        return newData;
        console.log(newData, "newData");
      }
    );
  };
  console.log(todos, "todos");

  useEffect(() => {
    fetchPost();
  }, []);
};

export { readData };
