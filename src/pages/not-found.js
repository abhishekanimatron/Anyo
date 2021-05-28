import { useEffect } from "react";
import Header from "../components/Header";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 Not Found - Anyo";
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-md">
        <p className="text-center text-2xl">404 Page Not Found.</p>
      </div>
    </div>
  );
}
