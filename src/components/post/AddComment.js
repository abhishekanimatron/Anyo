import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { useState, useContext } from "react";

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();
    // update comments to include this comment
    setComments([{ displayName, comment }, ...comments]);
    setComment("");
    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };
  return (
    <div className="border-t border-gray-primary">
      {/* comment box */}
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        // post when comment is present
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="Add your comment"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          autoComplete="off"
          type="text"
          placeholder="Add your comment"
          name="add-comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        ></input>
        <button
          // if no comment, the button is faded
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          type="button"
          // disabled if no comment is there
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
};
