import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@smooth-ui/core-em';
import { setupPieceOfCake, setupTiredAsF } from '../actions';

function SetupPractice({ pieceOfCake, tiredAsF }) {
  return (
    <div>
      <h1>Du har ikke satt opp øvelse for dagen enda</h1>
      <Button onClick={pieceOfCake}>"Piece of Cake" - Doble basstrommer</Button>
      <Button onClick={tiredAsF}>"Tired as f" - Doble basstrommer</Button>
    </div>);
}

SetupPractice.propTypes = {
  pieceOfCake: func.isRequired,
  tiredAsF: func.isRequired,
};

export default connect(
  null,
  (dispatch, ownProps) => (
    {
      pieceOfCake() {
        dispatch(setupPieceOfCake(ownProps.match.params.created));
      },
      tiredAsF() {
        dispatch(setupTiredAsF(ownProps.match.params.created));
      },
    }
  ),
)(SetupPractice);
