import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPostAndComments } from "../store/cross-selectors";
import { useActions } from "../store/posts";
import moment from "moment";
import { Container } from "react-bootstrap";

export default function PostPage() {
  const id = parseInt(useParams().id); // no need to validate id, data will return null if no matching articles found.
  const data = useSelector(selectPostAndComments(id));
  const { getPostAndComments } = useActions();
  // need to get the comment (at the same time as getting the post.)
  //check if post has already been loaded.
  getPostAndComments(id, data);

  if (data) {
    const { post, comments } = data;
    if (post) {
      const commentsList =
        comments && comments !== "No Comments"
          ? comments.map((comment) => <li>{comment.text}</li>)
          : comments;
      const { title, developer, content, createdAt, tags } = post;
      return (
        <Container>
          <h2>{title}</h2>
          <h5>
            By {developer?.name}, {moment(createdAt).format("DD-MM-YYYY")},{"  "}
            {tags.map((tag) => (
              <strong>{tag.tag}</strong>
            ))}
          </h5>
          <p style={{ width: "50vw" }}>{content}</p>
          <h5>Comments</h5>
          {commentsList}
        </Container>
      );
    }
  }
  console.log("loading post and comments", data);
  return <h3>loading post id:{id} </h3>;
  //else fetch the post
}
