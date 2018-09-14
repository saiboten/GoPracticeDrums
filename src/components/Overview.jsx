import React from 'react';
import { arrayOf } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Overview({ practices }) {
  const list = practices.map(el => (<li key={el}>{el}</li>));

  return (
    <div>
      <Link to="/addpractice">Legg til øving</Link>
      <ul>
        {list}
      </ul>
    </div>);
}

Overview.propTypes = {
  practices: arrayOf(String).isRequired,
};

export default connect(({ practice: { practices } }) => ({ practices }), null)(Overview);
