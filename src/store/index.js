import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import postsReducer from "./posts/reducer";
import commentsReducer from "./comments/reducer";
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (x) => x;

const enhancer = compose(applyMiddleware(ReduxThunk), devTools);

const store = createStore(
  combineReducers({ posts: postsReducer, comments: commentsReducer }),
  enhancer
);

export default store;
