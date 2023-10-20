import { collection, getDocs } from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "@components/firebase";

const [todos, setTodos] = useState([]);

const fetchPost = async () => {

    await getDocs(collection(db, "todos"))
        .then((querySnapshot)=>{
            const newData: any = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setTodos(newData);
            console.log(todos, newData);
        })

}

useEffect(()=>{
    fetchPost();
}, [])