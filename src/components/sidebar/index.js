import React from "react";
import useUser from "../../hooks/useUser";
import User from "./User";
import Suggestions from "./Suggestions";

export default function Sidebar() {
  const {
    user: { fullName, username, userId, following },
  } = useUser();

  console.log("following", following);

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} following={following} />
    </div>
  );
}
