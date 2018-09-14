import { delay } from 'redux-saga';
import { put, all } from 'redux-saga/effects';

// function* helloSaga(getFire) {
//   try {
//     yield getFire().push('/some/path', { nice: 'work!' });
//   } catch (err) {
//     console.log('Error in saga!:', err);
//   }
// }

function* incrementAsync() {
  yield delay(15000);
  yield put({ type: 'INCREMENT' });
}

// function* watchIncrementAsync() {
//   yield takeEvery('INCREMENT_ASYNC', incrementAsync);
// }

export default function* rootSaga() {
  yield all([
    incrementAsync(),
    // watchIncrementAsync(),
  ]);
}
