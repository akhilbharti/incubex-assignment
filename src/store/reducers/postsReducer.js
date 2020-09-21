import * as TYPES from "../actions/types";

export default (state = { loading: true, blogPosts: [] }, action) => {
  switch (action.type) {
    case TYPES.FETCH_POSTS:
      return { ...state, blogPosts: action.payload };
    case TYPES.FETCH_POSTS_LOADING:
      return { ...state, loading: true };
    case TYPES.FETCH_POSTS_FINISHED:
      return { ...state, loading: false };
    default:
      return state;
  }
};
