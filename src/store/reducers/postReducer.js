import * as TYPES from "../actions/types";

export default (state = { loading: true, comments: [], user: {} }, action) => {
  switch (action.type) {
    case TYPES.FETCH_POST:
      return { ...state, comments: action.payload };
    case TYPES.FETCH_USER:
      return { ...state, user: action.payload };
    case TYPES.FETCH_POST_COMMENTS_LOADING:
      return { ...state, loading: true };
    case TYPES.FETCH_POST_COMMENTS_FINISHED:
      return { ...state, loading: false };

    case TYPES.REMOVE_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments.filter((item) => item.id !== action.payload.id),
        ],
      };

    case TYPES.EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment, i) =>
          i === action.payload.id
            ? {
                ...comment,
                title: action.payload.title,
                body: action.payload.body,
              }
            : comment
        ),
      };

    case TYPES.ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    default:
      return state;
  }
};
