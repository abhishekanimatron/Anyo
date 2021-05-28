import PropTypes from "prop-types";
import Header from "./Header";
import Photos from "./Photos";
import { useReducer, useEffect } from "react";
import { getUserPhotosByUsername } from "../../services/firebase";

export default function Profile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(user.username);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    if (user.username) {
      getProfileInfoAndPhotos();
    }
  }, [user.username]);

  return (
    <>
      <Header
        profile={profile}
        followerCount={followerCount}
        photosCount={photosCollection ? photosCollection.length : 0}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    emailAddress: PropTypes.string,
    dateCreated: PropTypes.number,
    followers: PropTypes.array,
    following: PropTypes.array,
  }),
};
