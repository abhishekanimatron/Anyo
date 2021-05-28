import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import useUser from "../hooks/useUser";
import LoggedInUserContext from "../context/loggedInUser";

export default function Dashboard({ user: loggedInUser }) {
  const { user } = useUser(loggedInUser.uid);

  useEffect(() => {
    document.title = "Anyo";
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-md">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};
