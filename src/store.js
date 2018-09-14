import { applyMiddleware, compose, createStore } from 'redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import createSagaMiddleware from 'redux-saga';
import firebase from 'firebase';
import rootReducer from './reducers';
import rootSagas from './sagas';

const reduxConfig = {
  userProfile: 'users',
  enableLogging: 'false',
};

const firebaseConfig = {
  apiKey: 'AIzaSyB3rYyp8v9hluitIpwzYhjxDPyiq6r_Gg8',
  authDomain: 'gopracticedrums.firebaseapp.com',
  databaseURL: 'https://gopracticedrums.firebaseio.com',
  projectId: 'gopracticedrums',
  storageBucket: 'gopracticedrums.appspot.com',
  messagingSenderId: '447384429303',
};

firebase.initializeApp(firebaseConfig);

// function* helloSaga(getFb) {
//   try {
//     yield getFb().push('/some/path', { nice: 'work!' });
//   } catch (err) {
//     console.log('Error in saga!:', err);
//   }
// }

const sagaMiddleware = createSagaMiddleware(); // create middleware


const middleware = [
  sagaMiddleware,
];


export default createStore(
  rootReducer,
  {}, // initial state
  compose(
    reactReduxFirebase(firebase, reduxConfig),
    applyMiddleware(...middleware),
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    /* eslint-enable */
  ),
);

// when calling saga, pass getFirebase
sagaMiddleware.run(rootSagas, getFirebase);
