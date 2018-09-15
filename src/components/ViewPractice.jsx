import React from 'react';
import PropTypes from 'prop-types';
import TiredAsF from './TiredAsF';
import PieceOfCake from './PieceOfCake';

export default function ViewPractice(props) {
  const { practice: { type } } = props;
  switch (type) {
    case 'tiredasf': return (<TiredAsF {...props} />);
    case 'pieceofcake': return (<PieceOfCake {...props} />);
    default: return (<div>Hei</div>);
  }
}

ViewPractice.propTypes = {
  practice: PropTypes.shape({
    bpm: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
  }).isRequired,
};
