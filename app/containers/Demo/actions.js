/*
 *
 * Demo actions
 *
 */

import { DEFAULT_ACTION, GET_INFO_REQUEST } from './constants';
import { API_FETCH, PRIMARY_API_URL } from '../App/constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getInfoAction() {
  console.log('test');
  return {
    type: API_FETCH,
    onStart: GET_INFO_REQUEST,
    onSuccess: GET_INFO_REQUEST,
    onError: GET_INFO_REQUEST,
    payload: {},
    api: PRIMARY_API_URL,
    endpoint: '/search/shows?q=girls',
  };
}
