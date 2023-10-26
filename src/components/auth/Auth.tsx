import React, { useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const Auth = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    id: "",
    hasAccount: false,
  });

  const handleChangeSignEmail = (e: any) => {
    setLogin({
      ...login,
      // id: String(e.target.id),
      email: e.target.email,
    });
  };
  const handleChangePassword = (e: any) => {
    setLogin({
      ...login,
      password: e.target.password,
      // id: String(e.target.id),
    });
  };

  const createAccount = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(login.email, login.password)
      // .then((response) => {
      //         setLogin({
      //             ...login,
      //             hasAccount: true,
      //         })
      //         return console.log(response)
      //     })
      .catch((e) => console.log(e));

    // firebase.auth().signInWithEmailAndPassword(login.email, login.password)
    //     .then((response) => {
    //         setLogin({
    //             ...login,
    //             hasAccount: true,
    //         })
    //         return console.log(response)
    //     })
    //     .catch((e) => console.log(e))
  };

  return (
    <div>
      {login.hasAccount ? (
        <div>hello</div>
      ) : (
        <div>
          <input
            type="text"
            id="email"
            placeholder="email"
            onChange={(e) => handleChangeSignEmail(e)}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            onChange={(e) => handleChangePassword(e)}
          />
          <input type="submit" onClick={() => createAccount()} />
        </div>
      )}
    </div>
  );
};

export { Auth };
