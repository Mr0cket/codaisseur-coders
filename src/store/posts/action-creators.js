import { useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  FETCHNEXTPOSTS,
  LOADINGPOSTS,
  ALLPOSTSRETRIEVED,
  LOADINGAPOST,
  GOTAPOST,
} from "./action-types";
import axios from "../../config";
import { commentsThunk } from "../comments/action-creators";

//Consecutively Load Posts
const NextpostsThunk = async function (dispatch, getState) {
  const { offset, limit, count, loading } = getState().posts;
  if (offset >= count) return dispatch({ type: ALLPOSTSRETRIEVED });

  // only continue if not already loading.
  if (loading) return;

  // dispatch loading action.
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
};

//Get one Post
const onePostThunk = (postId) =>
  async function (dispatch, getState) {
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

// React custom hook...?
export default function useActions() {
  const d = useDispatch();

  const getPostAndComments = (postId, data) => {
    console.log("postId", postId);
    console.log(data);
    if (!data || data.post) return;
    if (!data.comments) d(commentsThunk(postId));
    d(onePostThunk(postId));
  };
  const fetchNextPosts = useCallback(() => {
    console.log("fetchNextPosts was called");
    // first
    d(NextpostsThunk);
    // returns all the possible actions
    // (which you can then call directly
    // (and they will call the dispatch.
    // (which means that you don't need to import useDispatch in your components
    // => Better separation of Concerns!
  }, [d]);
  return { fetchNextPosts, getPostAndComments };
}
