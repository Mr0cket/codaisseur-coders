import axios from "../../config";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
const { LOADINGCOMMENTS, GOTCOMMENTS } = require("./action-types");

export const commentsThunk = (postId) =>
  async function (dispatch, getState) {
    dispatch({ type: LOADINGCOMMENTS });
    const endpoint = `/posts/${postId}/comments`;
    const result = await axios.get(endpoint).catch((e) => console.error("axios error:", e.message));

    if (result) dispatch({ type: GOTCOMMENTS, payload: { id: postId, comments: result.data } });
  };

export default function useCommentActions() {
  const d = useDispatch();
  const getComments = useCallback(() => d(commentsThunk), [d]);
  return { getComments };
}
