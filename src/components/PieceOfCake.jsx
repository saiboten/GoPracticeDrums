import React from 'react';
import { connect } from 'react-redux';
import {
  shape, string, array, func, number,
} from 'prop-types';
import {
  Typography,
  FormGroup,
  Label,
  Input,
  ControlFeedback,
  Checkbox,
  FormCheck,
  FormCheckLabel,
  Textarea,
} from '@smooth-ui/core-em';
import styled from 'react-emotion';
import { Form, Field } from 'react-final-form';
import Paragraph from './Paragraph';
import { updatePractice, deletePractice } from '../actions';
import RadioButtonList from './RadioButtonList';
import { RadioButtonsWrapper } from './RadioButtonsWrapper';
import { BottomButtons } from './BottomButtons';

const StyledUl = styled('ul')`
    margin: 0;
    padding: 0;
`;

const StyledLi = styled('li')`
 list-style-type: none;
 font-size: 1.3rem;
 margin-bottom: 1rem;
`;

const adapt /* ⬅️ this is a HOC */ = Component => ({
  input,
  meta: { valid },
  ...rest
}) => <Component {...input} {...rest} valid={valid} />;

const AdaptedInput = adapt(Input);
const AdaptedCheckbox = adapt(Checkbox);
const AdaptedTextarea = adapt(Textarea);

function lap({ round, length }, index) {
  return (
    <StyledLi key={index}>
      <FormCheck>
        <Field
          name={`pass${round}_${index}`}
          component={AdaptedCheckbox}
          type="checkbox"
          id={`pass${round}_${index}`}
        />
        <FormCheckLabel htmlFor={`pass${round}_${index}`}>{`${index + 1} runde (${length / 60} minutter)`}</FormCheckLabel>
      </FormCheck>
    </StyledLi>
  );
}

lap.propTypes = {
  round: number.isRequired,
  length: number.isRequired,
};

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

function PieceOfCake(props) {
  const {
    submit,
    practice: {
      bpm,
      description,
      header,
      roundOne,
      roundTwo,
      pass1_0,
      pass1_1,
      pass2_0,
      pass2_1,
      pass2_2,
      notes,
      rating,
    },
  } = props;

  const lapsRoundOne = roundOne.map(lap);
  const lapsRoundTwo = roundTwo.map(lap);

  return (<Form
    onSubmit={submit}
    initialValues={{
      bpm,
      pass1_0: pass1_0 || false,
      pass1_1: pass1_1 || false,
      pass2_0: pass2_0 || false,
      pass2_1: pass2_1 || false,
      pass2_2: pass2_2 || false,
      notes,
      rating: rating || 0,
    }}
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
            placeholder="Beats Per Minute"
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

        <FormGroup>
          <Typography variant="h2">Rating</Typography>
          <RadioButtonsWrapper>
            <RadioButtonList />
          </RadioButtonsWrapper>
        </FormGroup>

        <FormGroup>
          <Label>Notater</Label>
          <Field
            name="notes"
            component={AdaptedTextarea}
            placeholder="Notater"
            control
            height="10rem"
          />
          <Error name="notes" />
        </FormGroup>

        <BottomButtons submitting={submitting} pristine={pristine} {...props} />

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
  deletePractice: func.isRequired,
};

export default connect(null, (dispatch, ownProps) => ({
  submit(newValues) {
    dispatch(updatePractice(ownProps.match.params.created, newValues));
  },
  deletePractice() {
    dispatch(deletePractice(ownProps.match.params.created));
  },
}))(PieceOfCake);
