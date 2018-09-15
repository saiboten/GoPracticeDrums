import React from 'react';
import PropTypes from 'prop-types';

export default function ViewPractice({ practice: { bpm, description, header } }) {
  return (
    <div>
      <h1>{header}</h1>
      <p>
BPM:
        {bpm}
      </p>
      <p>{description}</p>
    </div>);
}

ViewPractice.propTypes = {
  practice: PropTypes.shape({
    bpm: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
  }).isRequired,
};
