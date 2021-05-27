import { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import PropTypes from "prop-types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

export default function Header({
  followerCount,
  photosCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    username: profileUsername,
    following = [],
    followers = [],
  },
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeFollowButton = user.username && user.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  useEffect(() => {
    const isLoggedUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      // converts to truthy/falsey value (!!)
      setIsFollowingProfile(!!isFollowing);
    };
    if (user.username && profileUserId) {
      isLoggedUserFollowingProfile();
    }
  }, [profileUserId, user.username]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-md">
      <div className="container flex justify-center">
        {user.username && (
          <img
            alt={`${user.username} profile`}
            src={`/images/avatars/${profileUsername}.jpg`}
            className="rounded-full h-40 w-50 flex"
          />
        )}
      </div>
      <div className="flex items-center justify-between flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeFollowButton && (
            <button
              className="font-bold text-sm rounded bg-blue-medium text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="container flex ">
          {followers === undefined || following === undefined ? (
            <Skeleton count={1} width={500} height={25} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> Posts
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? `Follower` : `Followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following.length}</span> Following
              </p>
            </>
          )}
        </div>
        <div className="container ">
          <p className="font-medium">
            {!fullName ? (
              <Skeleton count={1} width={400} height={20} />
            ) : (
              fullName
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    username: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
  }).isRequired,
};
