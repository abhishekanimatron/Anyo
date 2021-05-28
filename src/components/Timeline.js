import { useContext } from "react";
import LoggedInUserContext from "../context/loggedInUser";
import Post from "./post/index";
import usePhotos from "../hooks/usePhotos";
import Skeleton from "react-loading-skeleton";

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);
  return (
    <div className="container col-span-2">
      {/* if photos are present display them */}
      {!photos ? (
        //  loading for photos using skeleton
        <Skeleton count={4} width={500} height={400} className="mb-8" />
      ) : (
        // map over photos and display them
        photos.map((content) => <Post key={content.docId} content={content} />)
      )}
    </div>
  );
}
