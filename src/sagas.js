import { put, takeEvery, all } from 'redux-saga/effects';

function* addPractice(getFirebase, { date }) {
  try {
    yield getFirebase().set(`/practices/${date}`, { setupComplete: false, created: date });
    yield put({ type: 'PRACTICE_ADDED' });
  } catch (err) {
    console.log('Error in saga!:', err);
  }
}

function addLaps(count = 1, length = 60) {
  const lap = {
    description: '',
    pass: false,
    length,
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
      bpm: -1,
      roundOne: addLaps(4),
      roundTwo: addLaps(4),
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
      bpm: -1,
      description: '',
      roundOne: addLaps(2, 900),
      roundTwo: addLaps(3, 600),
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
