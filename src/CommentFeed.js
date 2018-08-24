import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentFeed = props => {
  const handleLike = id => {
    props.likeComment(id, props.auth.name);
  };
  return (
    <div>
      <h1>{props.header}</h1>
      <CommentForm createComment={props.createComment} />
      {props.comments.map(comment => (
        <Comment key={comment.id} comment={comment} onLike={handleLike} />
      ))}
    </div>
  );
};

export default CommentFeed;
