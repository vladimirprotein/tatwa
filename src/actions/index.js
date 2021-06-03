

export const createModule = (pload) => {
  return {
    type: 'CREATE_MODULE',
    payload: pload
  };
};

export const deleteModule = (pload) => {
  return {
    type: 'DELETE_MODULE',
    payload: pload
  };
};

export const editModule = (pload) => {
  return {
    type: 'EDIT_MODULE',
    payload: pload
  };
};

// export const fetchStreams = () => {
//   return async (dispatch) => {
//     const response = await streams.get('/streams');
//
//     dispatch({
//       type: FETCH_STREAMS,
//       payload: response.data
//     });
//   };
// };
//
// export const fetchStream = (id) => {
//   return async (dispatch) => {
//     const response = await streams.get(`/streams/${id}`);
//
//     dispatch({
//       type: FETCH_STREAM,
//       payload: response.data
//     });
//   };
// };
//
// export const deleteStream = (id) => {
//   return async (dispatch) => {
//     await streams.delete(`/streams/${id}`);
//
//     dispatch({
//       type: DELETE_STREAM,
//       payload: id
//     });
//
//     history.push('/');
//   };
// };
//
// export const editStream = (id, formValues) => {
//   return async (dispatch) => {
//     const response = await streams.patch(`/streams/${id}`, formValues);
//
//     dispatch({
//       type: EDIT_STREAM,
//       payload: response.data
//     });
//
//     history.push('/');
//   };
// };
