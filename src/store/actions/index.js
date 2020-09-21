import * as TYPES from "./types";
import apifetcher from "../../api/fetcher";
import history from "../../history";
export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: TYPES.FETCH_POSTS_LOADING });
    const res = await apifetcher.get(`/posts`);
    await dispatch({
      type: TYPES.FETCH_POSTS,
      payload: res.data,
    });
    dispatch({ type: TYPES.FETCH_POSTS_FINISHED });
  } catch (err) {
    dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
    history.push(process.env.PUBLIC_URL + "/error");
  }
};

// Set loading to true for next render
export const clearPosts = () => {
  return {
    type: TYPES.FETCH_POSTS_LOADING,
  };
};

// Get single post
export const getPostComments = (id) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.FETCH_POST_COMMENTS_LOADING });
    const res = await apifetcher.get(`/posts/${id}/comments`);
    await dispatch({
      type: TYPES.FETCH_POST,
      payload: res.data,
    });

    await dispatch(getUserDetail(id));
    dispatch({ type: TYPES.FETCH_POST_COMMENTS_FINISHED });
  } catch (err) {
    dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
    history.push(process.env.PUBLIC_URL + "/error");
  }
};

// Get credits of single post
export const getUserDetail = (id) => async (dispatch) => {
  try {
    const res = await apifetcher.get(`/users/${id}`);
    dispatch({
      type: TYPES.FETCH_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
    history.push(process.env.PUBLIC_URL + "/error");
  }
};

// Set loading to true for next render
export const clearPost = () => {
  return {
    type: TYPES.FETCH_POST_LOADING,
  };
};

// Clear error
export const clearError = () => ({ type: TYPES.CLEAR_ERROR });

export const deleteComment = (id) => async (dispatch) => {
  try {
    const res = await apifetcher.delete(`/posts/${id}`);
    dispatch({
      type: TYPES.REMOVE_COMMENT,
      payload: { res, id },
    });
  } catch (err) {
    dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
    history.push(process.env.PUBLIC_URL + "/error");
  }
};

export const editCommentAction = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.FETCH_POST_COMMENTS_LOADING });

    const res = await apifetcher.put(`/posts/${id}`, data);
    dispatch({
      type: TYPES.EDIT_COMMENT,
      payload: res.data,
    });
    dispatch({ type: TYPES.FETCH_POST_COMMENTS_FINISHED });
  } catch (err) {
    dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
    history.push(process.env.PUBLIC_URL + "/error");
  }
};

export const addComment = (data) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.FETCH_POST_COMMENTS_LOADING });

    const res = await apifetcher.post(`posts/`, data);
    dispatch({
      type: TYPES.ADD_COMMENT,
      payload: res.data,
    });
    dispatch({ type: TYPES.FETCH_POST_COMMENTS_FINISHED });
  } catch (err) {
    dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
    history.push(process.env.PUBLIC_URL + "/error");
  }
};
