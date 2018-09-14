import { put, takeEvery, all } from 'redux-saga/effects';

function* addPractice(getFirebase) {
  try {
    yield getFirebase().push('/practices', { date: Date.now() });
    yield put({ type: 'PRACTICE_ADDED' });
  } catch (err) {
    console.log('Error in saga!:', err);
  }
}

function* watchAddPractice(something) {
  yield takeEvery('ADD_PRACTICE', addPractice, something);
}

export default function* rootSaga(getfb) {
  yield all([
    watchAddPractice(getfb),
  ]);
}
