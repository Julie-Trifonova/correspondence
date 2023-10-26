import React, { useState, useEffect } from "react";

import { auth } from "@components/firebase";
import { SignUp } from "@components/SignUp";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
  const [isUser, setUser] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/correspondence_system");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(true);
        console.log("uid", uid);
      } else {
        setUser(false);
        console.log("user is logged out");
      }
    });
  }, []);

  return (
    <div>
      {isUser ? (
        <div>
          <nav>
            <p>Welcome Home</p>

            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </nav>
        </div>
      ) : (
        <div>
          <NavLink to="correspondence_system/login">Sign in</NavLink>
          <NavLink to="correspondence_system/signup">Sign up</NavLink>
        </div>
      )}
    </div>
  );
};

export { Home };
