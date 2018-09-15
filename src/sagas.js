import { put, takeEvery, all } from 'redux-saga/effects';

function* addPractice(getFirebase) {
  try {
    const now = Date.now();
    yield getFirebase().set(`/practices/${now}`, { setupComplete: false, created: now });
    yield put({ type: 'PRACTICE_ADDED' });
  } catch (err) {
    console.log('Error in saga!:', err);
  }
}

function* setupTiredAsF(getFirebase, { date }) {
  try {
    yield getFirebase().set(`/practices/${date}`, {
      created: parseInt(date, 10), setupComplete: true, bpm: 120, header: 'Tired as f', description: '',
    });
  } catch (err) {
    console.log('Error in saga!:', err);
  }
}

function* setPieceOfCake(getFirebase, { date }) {
  try {
    yield getFirebase().set(`/practices/${date}`, {
      created: parseInt(date, 10), setupComplete: true, header: 'Piece of cake', bpm: 90, description: '',
    });
  } catch (err) {
    console.log('Error in saga!:', err);
  }
}

function* watchAddPractice(getFirebase) {
  yield takeEvery('ADD_PRACTICE', addPractice, getFirebase);
  yield takeEvery('SETUP_TIRED_AS_F', setupTiredAsF, getFirebase);
  yield takeEvery('SETUP_PIECE_OF_CAKE', setPieceOfCake, getFirebase);
}

export default function* rootSaga(getFirebase) {
  yield all([
    watchAddPractice(getFirebase),
  ]);
}
