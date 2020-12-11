import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../store/posts/index";
import PostBlob from "./PostBlob";

export default function PostsFeed() {
  const { fetchNextPosts } = useActions();
  const posts = useSelector((reduxState) => reduxState.posts);

  console.log(posts);

  // initial load.
  useEffect(() => {
    fetchNextPosts();
  }, []);
  const asyncElems = {};
  if (posts.fulfilled) asyncElems.postsList = posts.all.map((post) => <PostBlob post={post} />);
  if (posts.loading) asyncElems.loadingMessage = <h4>loading posts...</h4>;
  console.log("fulfilled:", posts.fulfilled);
  if (!posts.complete) asyncElems.loadMore = <button onClick={fetchNextPosts}>Load Posts</button>;
  console.log(posts.complete);
  return (
    <div className="PostsFeed">
      <h2>Recent posts</h2>
      {asyncElems.postsList}
      {asyncElems.loadingMessage}
      {asyncElems.loadMore}
    </div>
  );
}
