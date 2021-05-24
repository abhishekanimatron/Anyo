import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { getSuggestedProfiles } from "../../services/firebase";

export default function Suggestions({ userId, following }) {
  const [profiles, setProfiles] = useState(null); //suggested profiles state

  // after the page is loaded, we have user's info e.g userId
  useEffect(() => {
    // function to get suggested profiles based on userId passed
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }
    if (userId) {
      suggestedProfiles();
    }

    console.log("profiles", profiles);
  }, [userId]);

  return !profiles ? (
    <Skeleton count={1} height={100} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
    </div>
  ) : null;
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
};
