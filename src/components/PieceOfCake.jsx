import React from 'react';
import { connect } from 'react-redux';
import {
  shape, number, string, array, func,
} from 'prop-types';
import {
  Typography, FormGroup, Label, Input, ControlFeedback, Box, Button,
} from '@smooth-ui/core-em';
import styled from 'react-emotion';
import { Form, Field } from 'react-final-form';
import Paragraph from './Paragraph';
import { pieceOfCakeUpdate } from '../actions';

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
      {index + 1}
      {' '}
runde
      <div>
Gikk det bra?
        {' '}
        {el.pass ? 'Jepp' : 'Nope'}
      </div>
      <div>
Beskrivelse av runden:
        {' '}
        {el.description}
      </div>

    </StyledLi>
  );
}

const adapt /* ⬅️ this is a HOC */ = Component => ({
  input,
  meta: { valid },
  ...rest
}) => <Component {...input} {...rest} valid={valid} />;
const AdaptedInput = adapt(Input);

const Error = ({ name }) => (
  <Field name={name} subscription={{ error: true, touched: true }}>
    {({ meta: { touched, error } }) => (touched && error ? (
      <ControlFeedback valid={!error}>{error}</ControlFeedback>
    ) : null)
      }
  </Field>
);

Error.propTypes = {
  name: string.isRequired,
};

const required = value => (value ? undefined : 'Required');

function PieceOfCake({
  submit,
  practice: {
    bpm, description, header, roundOne, roundTwo,
  },
}) {
  const lapsRoundOne = roundOne.map(lap);
  const lapsRoundTwo = roundTwo.map(lap);

  return (<Form
    onSubmit={submit}
    initialValues={{ bpm }}
    render={({
      handleSubmit, form, submitting, pristine,
    }) => (
      <form onSubmit={handleSubmit}>
        <Typography variant="h1">{header}</Typography>
        <FormGroup>
          <Label>Bpm</Label>
          <Field
            name="bpm"
            component={AdaptedInput}
            placeholder="BPM goes here"
            validate={required}
            control
          />
          <Error name="bpm" />
        </FormGroup>

        <Paragraph>{description}</Paragraph>
        <Typography variant="h2">Første halvdel</Typography>
        <StyledUl>
          {lapsRoundOne}
        </StyledUl>

        <Typography variant="h2">Andre halvdel</Typography>
        <StyledUl>{lapsRoundTwo}</StyledUl>

        <Box justifyContent="space-around">
          <Button
            type="submit"
            disabled={submitting || pristine}
            variant="primary"
          >
                Oppdater
          </Button>
        </Box>

      </form>)}
  />
  );
}

PieceOfCake.propTypes = {
  practice: shape({
    bpm: string,
    description: string.isRequired,
    header: string.isRequired,
    roundOne: array.isRequired,
    roundTwo: array.isRequired,
  }).isRequired,
  submit: func.isRequired,
};

export default connect(null, (dispatch, ownProps) => ({
  submit(newValues) {
    dispatch(pieceOfCakeUpdate(ownProps.match.params.created, newValues));
  },
}))(PieceOfCake);
