import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

const User = ({ username, fullName }) =>
  !username || !fullName ? (
    // showing loading skeleton when either name is not there
    <Skeleton count={1} height={60} />
  ) : (
    // else show the profile information

    <Link
      to={`/p/${username}`}
      className="grid gap-4 grid-cols-4 mb-6 items-center"
    >
      {/* profile picture */}
      <div className="flex items-center justify-between col-span-1">
        <img
          src={`/images/avatars/${username}.jpg`}
          className="rounded-full w-16 flex mr-3"
          alt="pp"
        />
      </div>
      {/* names */}
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );

export default memo(User);

// for valiation & isRequired property
User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};
