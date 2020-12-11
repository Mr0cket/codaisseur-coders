export const selectPostAndComments = (postId) => (reduxState) => {
  const post = reduxState.posts.all.find((post) => post.id === postId);
  const comments = reduxState.comments.postId[`${postId}`];
  if (reduxState.posts.loading) return null;
  else return { post, comments };
};
