import React from 'react';
import { any } from 'prop-types';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SetupPractice from './SetupPractice';
import ViewPractice from './ViewPractice';

function Practice({ practice, ...rest }) {
  if (!isLoaded(practice)) {
    return (<div>Loading</div>);
  }
  return (<div>{practice.setupComplete ? <ViewPractice practice={practice} /> : <SetupPractice {...rest} />}</div>);
}

Practice.propTypes = {
  practice: any,
};

Practice.defaultProps = {
  practice: undefined,
};

export default compose(
  firebaseConnect(({ match: { params: { created } } }) => [
    `practices/${created}`, // { path: '/todos' } // object notation
  ]),
  connect(
    (state, ownProps) => ({
      practice: state.firebase.data.practices && state.firebase.data.practices[ownProps.match.params.created],
    }),
  ),
)(Practice);
