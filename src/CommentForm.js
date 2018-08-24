import React from "react";

const CommentForm = props => {
  let author, text;
  const handleSubmit = () => {
    props.createComment({
      author: author.value,
      text: text.value
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="author">Author</label>
      <input ref={node => (author = node)} type="text" id="author" />
      <label htmlFor="text">Comment</label>
      <input ref={node => (text = node)} type="text" id="text" />
    </form>
  );
};

export default CommentForm;
