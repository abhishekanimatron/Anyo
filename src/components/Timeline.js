import React from "react";
import Post from "./post/index";
import usePhotos from "../hooks/usePhotos";
import Skeleton from "react-loading-skeleton";

export default function Timeline() {
  const { photos } = usePhotos();
  console.log("photos", photos);
  return (
    <div className="container col-span-2">
      {/* if photos are present display them */}
      {!photos ? (
        <>
          {/* loading for photos using skeleton */}
          <Skeleton count={4} width={500} height={400} className="mb-8" />
        </>
      ) : photos?.length > 0 ? (
        // map over photos and display them
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        // else display this message
        <p className="text-center text-2xl">Follow for photos by friends</p>
      )}
    </div>
  );
}
