/*
 *
 * Rss actions
 *
 */

import { GET_FEEDS_REQUEST, GET_FEEDS_SUCCESS, GET_FEEDS_FAILURE } from './constants';
import { API_FETCH, PRIMARY_API_URL } from '../App/constants';

export function getRssFeeds(link) {
  return {
    type: API_FETCH,
    onStart: GET_FEEDS_REQUEST,
    onSuccess: GET_FEEDS_SUCCESS,
    onError: GET_FEEDS_FAILURE,
    payload: {},
    api: PRIMARY_API_URL,
    endpoint: link,
  };
}
export function clearData() {
  return {
    type: GET_FEEDS_FAILURE,
    payload: { message: null }
  };
}
