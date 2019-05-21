import { all, fork } from 'redux-saga/effects';
import { fetchListener } from './containers/App/saga';

export default function* rootSaga() {
  yield all([fork(fetchListener)]);
}
