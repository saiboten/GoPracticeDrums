import React from 'react';
import { any } from 'prop-types';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SetupPractice from './SetupPractice';
import ViewPractice from './ViewPractice';

function Practice({ practices }) {
  if (!isLoaded(practices)) {
    return (<div>Loading</div>);
  }
  return (<div>{practices.setupComplete ? <ViewPractice /> : <SetupPractice />}</div>);
}

Practice.propTypes = {
  practices: any,
};

Practice.defaultProps = {
  practices: undefined,
};

export default compose(
  firebaseConnect(({ match: { params: { date } } }) => [
    `practices/${date}`, // { path: '/todos' } // object notation
  ]),
  connect(
    (state, ownProps) => ({
      practices: state.firebase.data.practices && state.firebase.data.practices[ownProps.match.params.date],
    }),
  ),
)(Practice);
