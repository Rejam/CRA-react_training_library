import React from "react";

const Comment = ({ comment, onLike }) => {
  return (
    <div class="comment">
      <p>{comment.author}</p>
      <p>{comment.text}</p>
      <button data-testid={`${comment.id}`} onClick={() => onLike(comment.id)}>
        Like
      </button>
    </div>
  );
};

export default Comment;
