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

export const pieceOfCakeUpdate = (date, newValues) => ({
  type: 'PIECE_OF_CAKE_UPDATE',
  date,
  newValues,
});
