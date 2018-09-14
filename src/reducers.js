import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import practice from './practice';


export default combineReducers({
  practice,
  firebase: firebaseReducer,
});
