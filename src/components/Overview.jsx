import React from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { arrayOf, Any } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';

function Overview({ practices }) {
  const list = practices.map(el => (
    <li key={el.date}>
      <Link to={`/practice/${el.created}`}><Moment fromNowDuring={172800000} format="DD.MM.YYYY">{el.created}</Moment></Link>
    </li>));

  return (
    <div>
      <ul>
        {list}
      </ul>
    </div>);
}

Overview.propTypes = {
  practices: arrayOf(Any).isRequired,
};

export default compose(
  firebaseConnect([
    'practices', // { path: '/todos' } // object notation
  ]),
  connect(
    state => ({ practices: state.firebase.data.practices ? Object.values(state.firebase.data.practices) : [] }),
  ),
)(Overview);
