import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../FireBase/Config";

const userAuthContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState({});

  //sign in firebase user
  function signIn(email, password) {
    return signInWithEmailAndPassword(email, password);
  }

  //signup firebase user
  function signUp(email, password) {
    return createUserWithEmailAndPassword(email, password);
  }

  //logout firebase user
  function logOut() {
    return signOut(auth);
  }

  //listen on auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const values = {
    user,
    signIn,
    signUp,
    logOut,
  };

  return (
    <userAuthContext.Provider value={values}>
      {children}
    </userAuthContext.Provider>
  );
}

export const useUserAuthContext = () => useContext(userAuthContext);
