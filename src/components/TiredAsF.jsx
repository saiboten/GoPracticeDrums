import React from 'react';
import {
  shape, number, string, array, bool,
} from 'prop-types';

function lap(el, index) {
  return (
    <li key={index}>
      {el.pass ? 'Passed' : 'Failed'}
      {' '}
-
      {' '}
      {el.description}
    </li>
  );
}

export default function TiredAsF({
  practice: {
    bpm, description, header, roundOne, roundTwo,
  },
}) {
  const lapsRoundOne = roundOne.map(lap);
  const lapsRoundTwo = roundTwo.map(lap);

  return (
    <div>
      <h1>{header}</h1>
      <p>
BPM:
        {bpm}
      </p>
      <p>{description}</p>
      <h2>Runde 1</h2>
      <ul>
        {lapsRoundOne}
      </ul>

      <h2>Runde 2</h2>
      <ul>{lapsRoundTwo}</ul>
    </div>);
}

TiredAsF.propTypes = {
  practice: shape({
    bpm: number.isRequired,
    description: string.isRequired,
    header: string.isRequired,
    pass: bool.isRequired,
    roundOne: array.isRequired,
    roundTwo: array.isRequired,
  }).isRequired,
};
