import React, {useEffect, useState} from "react"

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Header } from "@components/Header/Header";
import { IncomingDocument } from "@components/IncomingDocument/IncomingDocument";
import { OutgoingDocument } from "@components/OutgoingDocument/OutgoingDocument";
import { connect, Provider } from "react-redux";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { IncomingCorrespondence } from "./pages/IncomingCorrespondence/IncomingCorrespondence";
import { OutgoingCorrespondence } from "./pages/OutgoingCorrespondence/OutgoingCorrespondence";
import store from "./redux/reduxStore";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {Auth} from "@components/auth/Auth";
import {SignIn} from "@components/SignIn";
import {SignUp} from "@components/SignUp";
import {Home} from "@components/Home";

import { collection, getDocs } from "firebase/firestore";
import {db} from "@components/firebase";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchPost = async () => {

    await getDocs(collection(db, "incomingCorrespondenceDocuments"))
        .then((querySnapshot)=>{
          const newData: any = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id }));
          setTodos(newData);
          console.log(todos, newData, 'newData');
        })

  }
  console.log(todos, 'todos')

  // const getMarker = async () => {
  //   const snapshot = await firebase.firestore().collection('events').get()
  //   return snapshot.docs.map(doc => doc.data());
  //   console.log(snapshot.docs, 'snapshot docs')
  // }

  useEffect(()=>{
    fetchPost();
    // getMarker()
  }, [])

  useEffect(() => {
    console.log(firebase)
    // const name = firebase.database. .ref("name")
  }, [])

  return (
    <>
      <HashRouter>
        <Provider store={store}>
          <Home/>
          <Header />
          <Routes>
            {/*<Route*/}
            {/*  path="/correspondence_system/"*/}
            {/*  element={<Home />}*/}
            {/*/>*/}
            <Route
              path="/correspondence_system/incomingCorrespondence"
              element={<IncomingCorrespondence />}
            />
            <Route
              path="/correspondence_system/outgoingCorrespondence"
              element={<OutgoingCorrespondence />}
            />
            <Route
              path="/correspondence_system/incomingCorrespondence/:documentId"
              element={<IncomingDocument />}
            />
            <Route
              path="/correspondence_system/outgoingCorrespondence/:documentId"
              element={<OutgoingDocument />}
            />
            <Route
              path="/correspondence_system/login"
              element={<SignIn/>}
            />
            <Route
              path="/correspondence_system/signup"
              element={<SignUp />}
            />
            {/*<Route path="*" element={<div>404 NOT FOUND</div>} />*/}
          </Routes>
        </Provider>
      </HashRouter>
    </>
  );
}

// const mapStateToProps = (state: any) => ({
//   // initialized: state.app.initialized
// });

// let AppContainer = compose(connect(mapStateToProps, {}))(App);

// const SamuraiJSApp: React.FC = () => {
//   return (
//     <BrowserRouter>
//       <Provider store={store}>
//         <AppContainer />
//       </Provider>
//     </BrowserRouter>
//   );
// };

export { App };
