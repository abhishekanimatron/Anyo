import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getPhotos, getUserByUserId } from "../services/firebase";

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      //get user's following values
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];

      //if they follows someone
      if (following.length > 0) {
        //then get photos
        followedUserPhotos = await getPhotos(userId, following);
      }
      //   to sort photos on basis of creation date
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }
    getTimelinePhotos();
  }, [userId]);

  return { photos };
}
