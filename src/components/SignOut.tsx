import React from "react";

import { auth } from "@components/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/correspondence_system");
        console.log("Signed out successfully");
      })
      .catch((error) => {});
  };

  return (
    <>
      <nav>
        {/*<p>*/}
        {/*    Welcome Home*/}
        {/*</p>*/}

        {/*<div>*/}
        {/*    <button onClick={handleLogout}>*/}
        {/*        Logout*/}
        {/*    </button>*/}
        {/*</div>*/}
      </nav>
    </>
  );
};

// export default Home;
