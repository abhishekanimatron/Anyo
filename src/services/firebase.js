import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
  // go inside firebase's firestore's 'users' collection where username is equal to
  //the username passed in, we get some values of which if value is > 0 the user exists
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}
