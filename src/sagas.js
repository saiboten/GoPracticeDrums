import { put, takeEvery, all } from 'redux-saga/effects';

function* addPractice(getFirebase, { date }) {
  try {
    yield getFirebase().set(`/practices/${date}`, { setupComplete: false, created: date });
    yield put({ type: 'PRACTICE_ADDED' });
  } catch (err) {
    console.log('Error in saga!:', err);
  }
}

function addLaps(count = 1, length = 60, round) {
  const lap = {
    description: '',
    pass: false,
    length,
    round,
  };

  const laps = [];
  for (let i = 0; i < count; i++) {
    laps.push(lap);
  }

  return laps;
}

function* setupTiredAsF(getFirebase, { date }) {
  try {
    yield getFirebase().update(`/practices/${date}`, {
      type: 'tiredasf',
      setupComplete: true,
      header: 'Tired as f',
      description: '',
      pass: false,
      roundOne: addLaps(8, 20, 1),
      roundTwo: addLaps(8, 20, 2),
    });
  } catch (err) {
    console.log('Error in saga!:', err);
  }
}

function* setPieceOfCake(getFirebase, { date }) {
  try {
    yield getFirebase().update(`/practices/${date}`, {
      type: 'pieceofcake',
      setupComplete: true,
      header: 'Piece of cake',
      description: '',
      roundOne: addLaps(2, 900, 1),
      roundTwo: addLaps(3, 600, 2),
    });
  } catch (err) {
    console.log('Error in saga!:', err);
  }
}

function* setupPractice(getFirebase, { date, newValues }) {
  try {
    yield getFirebase().update(`/practices/${date}`, {
      ...newValues,
    });
  } catch (err) {
    console.log('Error in saga!:', err);
  }
}

function* watchAddPractice(getFirebase) {
  yield takeEvery('ADD_PRACTICE', addPractice, getFirebase);
  yield takeEvery('SETUP_TIRED_AS_F', setupTiredAsF, getFirebase);
  yield takeEvery('SETUP_PIECE_OF_CAKE', setPieceOfCake, getFirebase);
  yield takeEvery('UPDATE_PRACTICE', setupPractice, getFirebase);
}

export default function* rootSaga(getFirebase) {
  yield all([
    watchAddPractice(getFirebase),
  ]);
}
