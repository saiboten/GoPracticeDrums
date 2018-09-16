import React from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { arrayOf, Any } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import styled from 'react-emotion';

const StyleLink = styled(Link)`
  text-decoration: none;

  &:active, &:visited {
    color: black;
  }
  &:hover {
    background-color: brown;
  }
`;

function Overview({ practices }) {
  const list = practices.map(el => (
    <li key={el.created}>
      <StyleLink to={`/practice/${el.created}`}>
        {el.setupComplete && `${el.header}`}
        {' '}
-
        {' '}
        <Moment fromNowDuring={172800000} format="DD.MM.YYYY">{el.created}</Moment>
      </StyleLink>
    </li>));

  return (
    <div>
      <h1>Oversikt over alle øvinger</h1>
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
