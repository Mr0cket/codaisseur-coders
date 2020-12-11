import { LOADINGCOMMENTS, GOTCOMMENTS } from "./action-types";
const initialState = {
  loading: false,
  postId: {},
  fulfilled: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADINGCOMMENTS: {
      return { ...state, loading: true };
    }
    case GOTCOMMENTS: {
      // payload will have 2 fields: id: postId, comments: array of comments for this post.
      return {
        ...state,
        postId: {
          ...state.postId,
          [action.payload.id]:
            action.payload.comments.count > 0 ? action.payload.comments.rows : "No Comments",
          loading: false,
          fulfilled: true,
        },
      };
    }
    default: {
      return state;
    }
  }
}
