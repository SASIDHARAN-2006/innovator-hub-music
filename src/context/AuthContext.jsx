import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { __Auth } from "../backend/FirebaseConfig";

export const AuthContextAPI = createContext();

const AuthProvider = (props) => {
  let [authuser, setAuthUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(__Auth, (userInfo) => {
      // console.log(userInfo);
      if (userInfo?.emailVerified === true) {
        setAuthUser(userInfo);
        window.localStorage.setItem("TOKEN",userInfo.accessToken);
      } else {
        setAuthUser(null);
        window.localStorage.removeItem("TOKEN")
      }
    });
  }, [__Auth]);

  return (
    <AuthContextAPI.Provider value={{ authuser, setAuthUser }}>
      {props.children}
    </AuthContextAPI.Provider>
  );
};

export default AuthProvider;
