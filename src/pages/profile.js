import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Header from "../components/Header";
import * as ROUTES from "../constants/routes";
import { getUserByUsername } from "../services/firebase";
import UserProfile from "../components/profile";

export default function Profile() {
  // getting username for parameters
  const { username } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUserExists() {
      // gets user
      const [user] = await getUserByUsername(username);
      if (user.userId) {
        setUser(user);
      } else {
        // if no user
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />

      <div className="mx-auto max-w-screen-md">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
