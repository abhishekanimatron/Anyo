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
export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  // get user's data along with id
  return result.docs.map((item) => ({ ...item.data(), docId: item.id }));
}

// get user from firestore passed where userid is equal to userid from auth
export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  // we get user information, alongside we also pass on document's id for CRUD operations
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
}
//gets a list of suggested profiles which the user is not following
export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

//increase the users following count by one he followed
export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId, //profile to be followed
  isFollowingProfile //boolean for if following or not
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

//increase the followed users followers as by logged in user's following action
export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserDocId, //profile to be followed
  isFollowingProfile //boolean for if following or not
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
}

// gets photos from a user
export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();
  // the photo
  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
  //photo details (username of poster, liked or not)
  const photoWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photoWithUserDetails;
}

export async function getUserPhotosByUsername(username) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", user.userId)
    .get();
  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername)
    .where("following", "array-contains", profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  await updateLoggedInUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingProfile
  );
  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  );
}
