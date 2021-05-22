import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Timeline from "../components/Timeline";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Anyo";
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
