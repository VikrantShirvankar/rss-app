/*
 *
 * Rss reducer
 *
 */
import produce from 'immer';
import { GET_FEEDS_REQUEST, GET_FEEDS_SUCCESS, GET_FEEDS_FAILURE } from './constants';

export const initialState = {
  feedsData: {},
  loading: false,
  errorMsg: null,
};

/* eslint-disable default-case, no-param-reassign */
const rssReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case GET_FEEDS_REQUEST:
        return { ...state, loading: true, errorMsg: null };
      case GET_FEEDS_SUCCESS:
        return { ...state, feedsData: action.payload, loading: false, errorMsg: null };
      case GET_FEEDS_FAILURE:{
        return { ...state, feedsData: {}, loading: false, errorMsg: action.payload.message };
      }
      default:
        return state;
    }
  });

export default rssReducer;
