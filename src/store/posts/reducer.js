import {
  FETCHNEXTPOSTS,
  LOADINGPOSTS,
  ALLPOSTSRETRIEVED,
  LOADINGAPOST,
  GOTAPOST,
} from "./action-types";
const initialState = {
  loading: false,
  fulfilled: false,
  offset: 0,
  all: [],
  limit: 2,
  count: null,
  complete: false,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADINGAPOST: {
      return { ...state, loading: true };
    }
    case LOADINGPOSTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCHNEXTPOSTS: {
      console.log("FETCHNEXTPOSTS called");
      if (!state.count) state.count = action.payload.count;
      return {
        ...state,
        loading: false,
        fulfilled: true,
        all: [...state.all, ...action.payload.rows],
        offset: state.offset + state.limit,
      };
    }
    case GOTAPOST: {
      return {
        ...state,
        all: [...state.all, action.payload],
        loading: false,
        fulfilled: true,
      };
    }
    case ALLPOSTSRETRIEVED: {
      return {
        ...state,
        complete: true,
      };
    }
    default:
      return state;
  }
}
