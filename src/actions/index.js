import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({
    type: "FETCH_POSTS",
    payload: response.data
  });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(
    `/users/${id}`
  );
  dispatch({
    type: "FETCH_USER",
    payload: response.data
  });
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

// Avoid duplicated requests by memoizing the action creator
// (problem here is the content is never updated - it is better to use solution above)
// export const fetchUser = (id) => async dispatch => {
//   _memoizedFetchUser(id, dispatch);
// };

// const _memoizedFetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({
//     type: "FETCH_USER",
//     payload: response.data
//   });
// });
