import React from 'react';
import {
  shape, number, string, array, bool,
} from 'prop-types';
import styled from 'react-emotion';
import { Typography } from '@smooth-ui/core-em';

const StyledUl = styled('ul')`
    margin: 0;
    padding: 0;
`;

const StyledLi = styled('li')`
 list-style-type: none;
 font-size: 1.3rem;
 margin-bottom: 1rem;
`;


function lap(el, index) {
  return (
    <StyledLi key={index}>
      <div>
        {index + 1}
        {' '}
runde
      </div>
      <div>
Gikk det bra?
        {' '}
        {el.pass ? 'Jepp' : 'Nope'}
      </div>
      <div>
Beskrivelse:
        {' '}
        {el.description}
      </div>

    </StyledLi>
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

      <Typography variant="h2">{header}</Typography>
      <p>
BPM:
        {bpm}
      </p>
      <p>{description}</p>
      <Typography variant="h2">Første gjennomføring</Typography>
      <StyledUl>
        {lapsRoundOne}
      </StyledUl>

      <Typography variant="h2">Andre gjennomføring</Typography>
      <StyledUl>{lapsRoundTwo}</StyledUl>
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
