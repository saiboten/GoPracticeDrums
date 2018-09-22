export const addPractice = date => ({
  type: 'ADD_PRACTICE',
  date,
});

export const setupPieceOfCake = date => ({
  type: 'SETUP_PIECE_OF_CAKE',
  date,
});

export const setupTiredAsF = date => ({
  type: 'SETUP_TIRED_AS_F',
  date,
});

export const updatePractice = (date, newValues) => ({
  type: 'UPDATE_PRACTICE',
  date,
  newValues,
});

export const deletePractice = date => ({
  type: 'DELETE_PRACTICE',
  date,
});
