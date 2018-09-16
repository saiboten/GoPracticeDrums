import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Button, Typography } from '@smooth-ui/core-em';
import styled from 'react-emotion';
import { setupPieceOfCake, setupTiredAsF } from '../actions';

const StyledButtonWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function SetupPractice({ pieceOfCake, tiredAsF }) {
  return (
    <div>
      <Typography variant="h1">Velg øvelse</Typography>
      <StyledButtonWrapper>
        <Button onClick={pieceOfCake}>"Piece of Cake" - Doble basstrommer</Button>
        <Button mt={10} onClick={tiredAsF}>"Tired as f" - Doble basstrommer</Button>
      </StyledButtonWrapper>
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
