import React from "react";
import { Badge, Row } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";

export default function PostBlob({ post }) {
  const { id, title, developer, createdAt, content, tags } = post;
  const tagslist = tags.map((tag) => (
    <Badge pill variant="secondary" key={tag.id}>
      {tag.tag}
    </Badge>
  ));
  return (
    <Row>
      <div>
        <h3>
          <Link to={`/posts/${id}`}>{title}</Link>
        </h3>
        <h5>
          By {developer?.name}, {moment(createdAt).format("DD-MM-YYYY")}, {tagslist}
        </h5>
      </div>
    </Row>
  );
}
