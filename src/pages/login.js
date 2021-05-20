import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";

export default function Login() {
  const history = useHistory(); //hook to route page using history
  const { firebase } = useContext(FirebaseContext); //context of firebase to perform authenticate

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || emailAddress === ""; //if either is empty this value is true//is invalid

  const handleLogin = () => {}; //on successfull entries //no error

  // update title of page on first render
  useEffect(() => {
    document.title = "Login - Anyo";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <p>No no haha </p>
    </div>
  );
}
