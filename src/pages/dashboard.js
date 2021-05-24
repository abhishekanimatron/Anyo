import React, { useEffect } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Timeline from "../components/Timeline";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Anyo";
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-md">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
