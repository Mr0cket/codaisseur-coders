import { useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  FETCHNEXTPOSTS,
  LOADINGPOSTS,
  ALLPOSTSRETRIEVED,
  LOADINGAPOST,
  GOTAPOST,
} from "./src/store/posts/action-types";
import axios from "./src/config";
import { commentsThunk } from "./src/store/comments/action-creators";

// This is where all the business logic for this slice lives.

//Consecutively Load Posts
export const NextpostsThunk = async function (dispatch, getState) {
  const { offset, limit, count, fulfilled, loading } = getState().posts;
  if (fulfilled && offset >= count) return dispatch({ type: ALLPOSTSRETRIEVED });

  // dispatch loading action
  if (!loading) {
    dispatch({ type: LOADINGPOSTS });
    const endpoint = `/posts?offset=${offset}&limit=${limit}`;
    const result = await axios.get(endpoint).catch((e) => {
      console.log("axios error:", e.message);
      return e;
    });
    const action = {
      type: FETCHNEXTPOSTS,
    };
    if (result.data) {
      action.payload = result.data;
    } else console.log("problem with data");
    dispatch(action);
  }
};

//Get one Post
export const onePostThunk = (postId) =>
  async function (dispatch, getState) {
    //check if I have the post data already (in the component
    // (how to separate that part of the process effectively??))
    // if I already have the post, no need to refetch it.
    //set loading state
    dispatch({ type: LOADINGAPOST });
    const endpoint = `/posts/${postId}`;
    const result = await axios.get(endpoint).catch((e) => {
      console.log("axios error:", e.message);
      return e;
    });
    const action = {
      type: GOTAPOST,
    };
    if (result?.data) action.payload = result.data;
    else console.log("problem with data");
    dispatch(action);
  };

//comments of A post
// Highest level function creates action-creators => object of action creators.
// you can call this function and then only need to dissociate
// the action creator functions that you will use in that component
// export default function useActions() {
// const d = useDispatch();

// assign the actions to useCallback (like useEffect, but only runs if one of the dependencies changes)
// const getPostAndComments = useCallback(
//   (postId) => {
//     console.log("postId", postId);
//     d(commentsThunk(postId));
//     d(onePostThunk(postId));
//   },
//   [d]
// );

// const getPostAndComments = (postId, data) => {
//   console.log("postId", postId);

//   if (!data) {
//     d(commentsThunk(postId));
//     d(onePostThunk(postId));
//   }
// };

// const fetchNextPosts = useCallback(() => {
//   console.log("fetchNextPosts was called");
//   // first
//   d(NextpostsThunk);
//   // returns all the possible actions
//   // (which you can then call directly
//   // (and they will call the dispatch.
//   // (which means that you don't need to import useDispatch in your components
//   // => Better separation of Concerns!
//   // )))
// }, [d]);

function hookFactory(actionCreator) {
  const d = useDispatch();

  return () => () => d(actionCreator);
}
function customFactory(data, postId, ...thunks) {
  const d = useDispatch();
  if (!data) return () => () => thunks.forEach((thunk) => d(thunk(postId)));
}

export const fetchPostAndComments = customFactory();
export const fetchNextposts = hookFactory(NextpostsThunk);
