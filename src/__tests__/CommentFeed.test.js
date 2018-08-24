import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import CommentFeed from "../CommentFeed";
import React from "react";

afterEach(cleanup);

const createProps = props => ({
  header: "Comment Feed",
  comments: [
    {
      id: 0,
      author: "Adam",
      text: "Aaaaa aaaaa"
    },
    {
      id: 1,
      author: "Ben",
      text: "Bbbb bbbbb bb"
    }
  ],
  createComment: jest.fn(),
  likeComment: jest.fn(),
  auth: { name: "Adam" },
  ...props
});
describe("Test comment feed component", () => {
  const props = createProps();
  test("Renders header", () => {
    const { queryByText } = render(<CommentFeed {...props} />);
    const header = queryByText(props.header);
    expect(header.textContent).toBe(props.header);
  });

  test("Renders the correct number of comments", () => {
    const { container } = render(<CommentFeed {...props} />);
    const commentNodes = container.querySelectorAll(".comment");
    expect(commentNodes.length).toBe(props.comments.length);
  });

  test("Renders author", () => {
    const { queryByText } = render(<CommentFeed {...props} />);
    expect(queryByText(props.comments[0].author)).toBeTruthy();
  });

  test("Renders comment text", () => {
    const { queryByText } = render(<CommentFeed {...props} />);
    expect(queryByText(props.comments[0].text)).toBeTruthy();
  });

  test("allows user to add a comment", () => {
    const newComment = { author: "Carl", text: "C c c c c c c" };
    const props = createProps();
    const { container, getByLabelText } = render(<CommentFeed {...props} />);

    const authorInput = getByLabelText("Author");
    const textInput = getByLabelText("Comment");
    const form = container.querySelector("form");

    // Actions
    authorInput.value = newComment.author;
    textInput.value = newComment.text;
    fireEvent.submit(form);

    // Assertions
    expect(props.createComment).toHaveBeenCalledTimes(1);
    expect(props.createComment).toHaveBeenCalledWith(newComment);
  });

  test("user can like a comment", () => {
    const props = createProps();
    const id = props.comments[1].id;

    const { getByTestId } = render(<CommentFeed {...props} />);
    const likeNode = getByTestId(`${id}`);
    fireEvent.click(likeNode);

    expect(props.likeComment).toHaveBeenCalledTimes(1);
    expect(props.likeComment).toHaveBeenCalledWith(id, props.auth.name);
  });
});
