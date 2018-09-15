import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { addPractice } from '../actions';

function AddPractice({ submit }) {
  return (
    <div>
      <button type="button" onClick={submit}>Legg til dag</button>
    </div>
  );
}

AddPractice.propTypes = {
  submit: func.isRequired,
};


export default connect(
  null,
  dispatch => ({
    submit() {
      dispatch(addPractice());
    },
  }),
)(AddPractice);
