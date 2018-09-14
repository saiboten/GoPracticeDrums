import produce from 'immer';

const initialState = {
  practices: [],
};

const practice = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state;
    case 'ADD_PRACTICE':
      return produce(state, (draftState) => {
        draftState.practices.push(action.date);
      });
    case 'TOGGLE_TODO':
      return state.map(todo => ((todo.id === action.id)
        ? { ...todo, completed: !todo.completed }
        : todo));
    default:
      return state;
  }
};

export default practice;
