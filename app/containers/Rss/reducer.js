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
};

/* eslint-disable default-case, no-param-reassign */
const rssReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case GET_FEEDS_REQUEST:
        return { ...state, loading: true };
      case GET_FEEDS_SUCCESS:
        return { ...state, feedsData: action.payload, loading: false };
      case GET_FEEDS_FAILURE:{
        console.log('came in failure');
        return { ...state, feedsData: {}, loading: false };
      }
      default:
        return state;
    }
  });

export default rssReducer;
