import { combineReducers } from "redux";
import configReducer from "./configReducer";
import postsReducer from "./postsReducer";
import postReducer from "./postReducer";
import errorsReducer from "./errorsReducer";

export default combineReducers({
  general: configReducer,
  posts: postsReducer,
  postComments: postReducer,
  errors: errorsReducer,
});
