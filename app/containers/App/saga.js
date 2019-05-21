import { call, put, takeEvery } from 'redux-saga/effects';
import { API_FETCH, PRIMARY_API_URL } from './constants';
import API from './api';

export function* fetchListener() {
  console.log('Listener Running');
  yield takeEvery(API_FETCH, fetch);
}

function* fetch(action) {
  yield call(makeAuthenticatedRequest, action);
}

function* makeAuthenticatedRequest(action) {
  const { endpoint, payload, method, onStart, onSuccess, onError, headers, api } = action;
  console.log('@@@@@@@@@@', action);
  if (onStart) {
    yield put({ type: onStart, payload });
  }

  try {
    const response = yield API.instance().callSecure(api, endpoint, payload, method, headers);

    console.log('response', response);
    if (
      response &&
      response.error &&
      ((response.code && response.code !== 200) || (response.status && response.status !== 200))
    ) {
      const err = {
        response: {
          status: response.code || response.status,
          statusText: response.message,
        },
      };
      throw err;
    }

    if (onSuccess) {
      yield put({ type: onSuccess, payload: response, appPayload: payload });
    }
  } catch (err) {
    const error = yield parseError(err);
    if (onError) {
      yield put({ type: onError, payload: error, appPayload: payload });
    }
  }
}

/**
 *  If the errors is formatted by the server, tranforms it to a JS object. Otherwise,
 *  pass the raw error.
 *  @param   {Object}  error
 *  @return  {Generator}
 */
function* parseError(error) {
  let parsed;

  try {
    parsed = yield error.response.json();
  } catch (err) {
    if (error.response) {
      parsed = {
        status: error.response.status,
        message: error.response.statusText,
      };
    } else if (error.status && error.status.message) {
      parsed = error.status.message;
    } else {
      parsed = { name: error.name, message: error.message };
    }
  }

  return parsed;
}
