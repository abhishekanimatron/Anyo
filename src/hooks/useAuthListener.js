import { useState, useContext, useEffect } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListener() {
  //user stored in local storage
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  const { firebase } = useContext(FirebaseContext);

  //on state change firebase we check if user is there
  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      //yes, then set local storage to user's info
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
        //else remove the user stored
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });
    //cleanup
    return () => listener();
  }, [firebase]);

  return { user };
}
