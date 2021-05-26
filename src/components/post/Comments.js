import { useState } from "react";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AddComment from "./AddComment";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);
  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {/* if comments are more display a message */}
        {comments.length >= 3 && (
          <p className="text-sm text-gray-base mb-1 cursor-pointer">
            View all {comments.length} comments
          </p>
        )}
        {comments.slice(0, 3).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            {/* link to user's profile */}
            <Link to={`/p/${item.displayName}`}>
              <span className="font-bold mr-1">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
